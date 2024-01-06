import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../db/prismadb";


const register = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).send('Missing info');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma?.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });
    res.status(200).json({ message: 'Registration successful', user });
  
  } catch (error: any) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default register;
