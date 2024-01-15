import express from "express";
import register from "../controllers/register";
import login from "../controllers/login";
import refresh from "../controllers/refreshToken";
// import logout from "../controllers/logout";
// import auth from "../middlewares/auth";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/refresh", refresh);

// router.post("/logout", auth, logout);

module.exports = router;
