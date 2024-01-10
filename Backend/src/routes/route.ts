import express from "express";
import register from "../controllers/register";
import login from "../controllers/login";

const router = express.Router()

router.post('/register', register)

router.post("/login", login);


module.exports = router;
