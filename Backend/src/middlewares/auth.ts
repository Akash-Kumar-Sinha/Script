import { Request, Response } from "express";
import prisma from "../db/prismadb";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY as Secret; // Asserting the type as Secret
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

  jwt.verify(refreshToken, "refreshnotapi", (err:any) => {
    if (err) {
      return res.status(403).json("Refresh Token is not valid");
    }

    const newAccessToken = jwt.sign({ email: email, id: user.id }, SECRET_KEY);
    const newRefreshToken = jwt.sign(
      { email: email, id: user.id },
      "refreshnotapi"
    );
    refreshTokens = refreshTokens.filter(
      (token: string) => token !== refreshToken
    );
    refreshTokens.push(newRefreshToken);

    res
      .status(200)
      .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  });
};

export default refreshToken;
