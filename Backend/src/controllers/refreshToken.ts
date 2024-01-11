import { Request, Response } from "express";
import prisma from "../db/prismadb";
import jwt from "jsonwebtoken";

const SECRET_KEY = "notapi";
export let refreshTokens: string[] = [];

const refreshToken = async (req: Request, res: Response) => {
  console.log("refresh");
  const { email } = req.body;
  const user = await prisma?.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const refreshToken = req.body.token;
  if (!refreshToken) {
    return res.status(401).json("You are not authenticated.");
  }
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh Token is not valid");
  }
  jwt.sign(refreshToken, "refreshnotapi", () => {
    refreshTokens = refreshTokens.filter(
      (token: string) => token !== refreshToken
    );

    const newAccessToken = jwt.sign({ email: email, id: user.id }, SECRET_KEY, {
      expiresIn: "60m",
    });
    const newRefreshToken = jwt.sign(
      { email: email, id: user.id },
      "refreshnotapi"
    );
    refreshTokens.push(newRefreshToken);

    res
      .status(200)
      .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  });
};

export default refreshToken;
