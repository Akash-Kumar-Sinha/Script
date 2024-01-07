import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import register from "./controllers/register";
import login from "./controllers/login";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.post("/api/register", register);
app.post("/api/login", login);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

// export default app;