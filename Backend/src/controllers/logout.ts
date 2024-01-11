import { Request, Response } from "express";
import { refreshTokens } from "./refreshToken";

const logout = (req: Request, res: Response) => {
    const refreshToken = req.body.token;
    const index = refreshTokens.indexOf(refreshToken);
    if (index !== -1) {
        refreshTokens.splice(index, 1);
    }

    res.status(200).json("You logged out successfully.");
}

export default logout;
