import { Request, Response } from "express";
import { pusherServer } from "../middlewares/pusher";

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  conversationIds: [];
  seenMessageIds: [];
}

const Handler = async (req: Request, res: Response) => {
  console.log("Handler");
  console.log("Handler ", req.body);

  const currentUser = req.user as User;

  if (!currentUser.email) {
    console.log("currentUser in  pusehrauth");
    return res.status(401);
  }

  const sockerId = req.body.socket_id;

  const channel = req.body.channel_name;

  const data = {
    user_id: currentUser.email,
  };

  try {
    const authResponse = pusherServer.authorizeChannel(sockerId, channel, data);

    return res.send(authResponse);
  } catch (error) {
    console.log("pusehrautj", error);
  }
};

export default Handler;
