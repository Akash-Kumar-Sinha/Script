// getCurrentUser.ts
import { Request, Response } from "express";

const getCurrentUser = (req: Request, res: Response) => {
  try {
    // console.log("getCurrentUser");
    const userData = req.user;

    res.json({ message: "Access granted", user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getCurrentUser;
