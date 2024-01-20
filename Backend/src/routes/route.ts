// route.ts
import express from "express";
import register from "../controllers/register";
import login from "../controllers/login";
import passport from "passport";
import getCurrentUser from "../controllers/getCurrentUser";

// import logout from "../controllers/logout";
// import auth from "../middlewares/auth";
import "../middlewares/passport_jwt";


const router = express.Router();

router.post("/register", register);

router.post("/login", login);

// router.post("/refresh", refresh);userspage
// router.get("/userspage", passport.authenticate("jwt", { session: false }));

router.get("/currentuser", passport.authenticate("jwt", { session: false }), getCurrentUser);

module.exports = router;