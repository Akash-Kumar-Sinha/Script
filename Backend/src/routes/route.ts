import express, { Request, Response } from "express";
import passport from "passport";

import register from "../controllers/authentication/register";
import login from "../controllers/authentication/login";
import getCurrentUser from "../controllers/users/getCurrentUser";
import getUsers from "../controllers/users/getUsers";
import Users from "../controllers/users/Users";
import conversations from "../controllers/conversation";
import getConversation from "../controllers/getConversation";
import getConversationById from "../controllers/getConversationById";
import getMessage from "../controllers/getMessage";
import Messages from "../controllers/message";
import seenRoute from "../controllers/seenRoute";
import conversationDelete from "../controllers/conversationDelete";
import setting from "../controllers/setting";

import "../middlewares/passport_google";
import "../middlewares/passport_jwt";
import getSocialUsers from "../controllers/users/getSocialUsers";

const router = express.Router();

router.use(passport.initialize());

router.post("/register", register);

router.post("/login", login);

router.get("/failed", (req: Request, res: Response) => {
  res.status(401).json({
    error: true,
    message: "Login Failed",
  });
});

router.get("/logout", (req: Request, res: Response) => {
  res.clearCookie("connect.sid", { path: "/" });
  res.status(200).send("Logout successful");
});

router.get("/success", getSocialUsers);


router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_PAGE_URL}/users`,
    failureRedirect: "/failed",
  })
);

router.get(
  "/currentuser",
  passport.authenticate("jwt", { session: false }),
  getCurrentUser
);

router.get("/getUsers", getUsers);

router.get("/users", Users);

router.post(
  "/conversations",
  passport.authenticate("jwt", { session: false }),
  conversations
);

router.get(
  "/getconversation",
  passport.authenticate("jwt", { session: false }),
  getConversation
);

router.get(
  `/getconversationsbyid/:conversationId`,
  passport.authenticate("jwt", { session: false }),
  getConversationById
);

router.get(
  `/getmessage/:conversationId`,
  passport.authenticate("jwt", { session: false }),
  getMessage
);

router.post("/message", Messages);

router.post(
  "/:conversationId/seen",
  passport.authenticate("jwt", { session: false }),
  seenRoute
);

router.delete(
  "/conversationDelete/:conversationId",
  passport.authenticate("jwt", { session: false }),
  conversationDelete
);

router.post(
  "/setting",
  passport.authenticate("jwt", { session: false }),
  setting
);

module.exports = router;
