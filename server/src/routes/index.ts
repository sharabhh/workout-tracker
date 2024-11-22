import express, { Request, Response} from "express";
import { User } from "../schema";
import { userTypes } from "../types";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { verifyJwt } from "../middleware/auth";

dotenv.config();

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || "verySifficultString";
// @ts-ignore

router.get("/",verifyJwt,async (req: Request, res: Response): Promise<any> => {
    try {
      const { username } = req.user;

      if (username) {
        const response = await User.findOne({ username }, { password: 0 });
        return res.status(200).json({ data: response });
      }

      return res.status(404).json({ msg: "user not found" });
    } catch (e) {
      return res.status(500).json({ msg: "server side error" });
    }
  }
);

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
    return res.status(500).json({ msg: "serevr error" });
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
      return res.status(409).json({ msg: "user already exists" });
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
    res.status(500).json({ msg: "serevr error" });
  }
});

export default router;
