import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../db/prismadb";
import jwt, { Secret } from "jsonwebtoken";
import { refreshTokens } from "./refreshToken";

const SECRET_KEY = process.env.JWT_SECRET_KEY as Secret;

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

    if (!user) {
      return res.status(500).json({ error: "Failed to create user" });
    }

    const accessToken = jwt.sign({ email: email, id: user.id }, SECRET_KEY);
    const refreshToken = jwt.sign(
      { email: email, id: user.id },
      "refreshnotapi"
    );

    user.hashedPassword = null;
    refreshTokens.push(refreshToken);

    res
      .status(200)
      .json({
        message: "Registration successful",
        user,
        accessToken,
        refreshToken,
      });
  } catch (error: any) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default register;
