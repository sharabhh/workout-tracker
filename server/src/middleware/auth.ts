import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
const secretKey = process.env.JWT_SECRET;

function verifyJwt(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");
  console.log(token);
  console.log(secretKey);
  
  

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secretKey || "verySifficultString");
    req.user = decoded;
    
    next()
  } catch (e) {
    return res.status(400).json({ message: "Invalid token." });
  }
}

export {verifyJwt}