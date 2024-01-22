// controllers/getCurrentUser.ts
import { Request, Response } from "express";

const getCurrentUser = (req: Request, res: Response) => {
  try {
    const userData = req.user;
    console.log("getCurrent User");
    // console.log(userData);

    res.json({ message: "Access granted", user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getCurrentUser;
