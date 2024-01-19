//server.ts
import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";

const router = require("../src/routes/route");
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize())

app.use("/api", router);


app.get("/", (req: Request, res: Response) => {
  res.json("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
