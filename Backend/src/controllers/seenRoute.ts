import { Request, Response } from "express";
import prisma from "../db/prismadb";

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

const seenRoute = async (req: Request, res: Response) => {
  console.log("seenRoute");
  try {
    const currentUser = req.user as User;
    const { conversationId } = req.body;
    if (!currentUser?.id || !currentUser?.email) {
      return res.status(401).json("Unauthorized");
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });

    if (!conversation) {
      return res.status(400).json("invalid Id");
    }

    const lastMessage =
      await conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return res.json(conversation);
    }

    const updateMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });
    return res.json(updateMessage);
  } catch (error) {
    console.log("seenRoute Error", error);
    res.status(500).json("Internal Server Error");
  }
};

export default seenRoute;
