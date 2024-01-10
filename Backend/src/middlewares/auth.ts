import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"; // Import Secret type
const SECRET_KEY = "notapi";
dotenv.config();

interface AuthRequest extends Request {
  userId?: string;
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token = req.headers.authorization;

    if (token) {
      token = token.split(" ")[1];

      let user = jwt.verify(token, SECRET_KEY) as { id: string };
      req.userId = user.id;
    } else {
      res.status(401).json({ message: "Unauthorized Middleware User" });
    }
    next();
  } catch (error) {
    console.log("auth middleware error ", error);
    res.status(401).json({ message: "Unauthorized Middleware User" });
  }
};

export default auth;
