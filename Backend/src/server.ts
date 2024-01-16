import express, { Request, Response, Application, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
const session = require('express-session');
const MongoStore = require('connect-mongo');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

const router = require("../src/routes/route");
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

const sessionStore = MongoStore.create({
  mongoUrl: process.env.DATABASE_URL,
  collectionNames: 'sessions'
});

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.json("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
