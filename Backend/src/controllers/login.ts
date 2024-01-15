import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../db/prismadb";
import jwt from "jsonwebtoken";
import { refreshTokens } from "./refreshToken";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const login = async (req: Request, res: Response) => {
  try {
    console.log("login");
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("Missing info");
    }

    if (!SECRET_KEY) {
      return res.status(500).json({ error: "JWT secret key is not defined" });
    }

    const user = await prisma?.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (user.hashedPassword !== null) {
      const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
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
      .json({ message: "Login successful", user, accessToken, refreshToken });
  } catch (error: any) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default login;
