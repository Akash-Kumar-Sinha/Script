// routes/route.ts
import express, { Request, Response } from "express";
import register from "../controllers/register";
import login from "../controllers/login";
import passport from "passport";
import getCurrentUser from "../controllers/getCurrentUser";

import "../middlewares/passport_jwt";
import "../middlewares/passport_google";
import getUsers from "../controllers/getUsers";
import Users from "../controllers/Users";
import conversations  from "../controllers/conversation";

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
  passport.authenticate("google", { failureRedirect: "http://localhost:3000/",successRedirect: "http://localhost:3000/userspage" }), getCurrentUser
);

router.get(
  "/currentuser",
  passport.authenticate("jwt", { session: false }),
  getCurrentUser
);

router.get('/getUsers', getUsers)
router.get('/users', Users)
router.post('/conversations',passport.authenticate("jwt", { session: false }), conversations)


module.exports = router;
