import { Request, Response } from "express";

const protect = (req: Request, res: Response) => {
  return res.status(200).send({ message: "This is Akash" });

};

export default protect;