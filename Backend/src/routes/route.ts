// routes/route.ts
import express, { Request, Response } from "express";
import register from "../controllers/register";
import login from "../controllers/login";
import passport from "passport";
import getCurrentUser from "../controllers/getCurrentUser";

import "../middlewares/passport_jwt";
import "../middlewares/passport_google";

const router = express.Router();

router.use(passport.initialize());

router.post("/register", register);

router.post("/login", login);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email", "openid"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req: Request, res: Response) => {
    console.log("route: passport authenticate google");
    getCurrentUser(req, res);
    // res.redirect("http://localhost:3000/userpage");
  }
);

router.get(
  "/currentuser",
  passport.authenticate("jwt", { session: false }),
  getCurrentUser
);

module.exports = router;
