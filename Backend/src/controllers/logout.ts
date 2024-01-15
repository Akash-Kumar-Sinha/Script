import { Request, Response } from "express";
import { refreshTokens } from "./refreshToken";

const logout = (req: Request, res: Response) => {
    const refreshToken = req.body.token;

    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.status(401).json({ message: "Invalid refresh token" });
    }

    try {
        const index = refreshTokens.indexOf(refreshToken);
        refreshTokens.splice(index, 1);

        res.status(200).json({ message: "You logged out successfully." });
    } catch (error) {
        console.error("Error during logout:", error);

        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default logout;
