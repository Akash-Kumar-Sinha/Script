import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../db/prismadb";
import jwt from 'jsonwebtoken';

const SECRET_KEY = "notapi"

const register = async (req: Request, res: Response) => {
  console.log("register");
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json("Missing info");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma?.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    const token = jwt.sign({email: user.email, id: user.id }, SECRET_KEY);

    res.status(200).json({ message: "Registration successful", user, token });
  } catch (error: any) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default register;
