import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { User } from "../schema";
import { userTypes } from "../types";
import { z } from "zod";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("reached user route");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
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
      return res.status(201).json({ msg: "user created!" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "serevr error" });
  }
});

export default router;
