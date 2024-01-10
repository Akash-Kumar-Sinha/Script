import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../db/prismadb";
import jwt, { Secret } from 'jsonwebtoken'; 

const SECRET_KEY = "notapi"


const login = async (req: Request, res: Response) => {
  try {
    console.log("login");
    const { email, password } = req.body;
  

    if (!email || !password) {
      return res.status(400).json("Missing info");
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

    const token = jwt.sign({email: email, id: user.id }, SECRET_KEY);
    user.hashedPassword = null;
    
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error: any) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default login;
