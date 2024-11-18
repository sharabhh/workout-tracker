import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { User } from "../schema";
import { userTypes } from "../types";
import jwt from "jsonwebtoken";

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || "sample-string";

router.get("/", (req, res) => {
  res.send("reached user route");
});

router.post("/login", async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password } = req.body;

    const userObj = {
      username,
      password,
    };

    const zodValidation = userTypes.safeParse(userObj).success;
    if (!zodValidation) {
      return res.status(400).json({ msg: "incorrect data" });
    }

    const userExists = await User.findOne({ username });
    if (!userExists) {
      return res.status(404).json({ msg: "user doesn't exist" });
    }

    if (password !== userExists.password) {
      return res.status(401).json({ msg: "incorrect password" });
    }
    const token = jwt.sign(
      { id: userExists._id, username: userExists.username },
      jwtSecret
    );
    return res.status(200).json({ msg: "logged in", token });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "serevr error" });
  }
});

router.post("/signup", async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password } = req.body;

    const userObj = {
      username,
      password,
    };

    const zodValidation = userTypes.safeParse(userObj).success;
    if (!zodValidation) {
      return res.status(400).json({ msg: "incorrect data" });
    }

    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(401).json({ msg: "user already exists" });
    }

    const createUser = await User.create({
      username,
      password,
    });
    if (createUser) {
      const token = jwt.sign(
        { id: createUser._id, username: createUser.username },
        jwtSecret
      );
      return res.status(201).json({ msg: "user created!", token });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "serevr error" });
  }
});

export default router;
