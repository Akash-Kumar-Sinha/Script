import express, { Request, Response, NextFunction } from "express";
import register from "../controllers/register";
import login from "../controllers/login";
import refresh from "../controllers/refreshToken";
import passport from "passport";
// import logout from "../controllers/logout";
// import auth from "../middlewares/auth";
require("../middlewares/passport");

const router = express.Router();

router.post("/register", register);

router.post('/login', passport.authenticate('local'), login);

// router.post("/refresh", refresh);

// router.post("/logout", auth, logout);

module.exports = router;
