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

const Messages = async (req: Request, res: Response) => {
  console.log("Message");
  try {
    const userEmail = req.query.userEmail as string;
    const currentUser = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    // console.log(conversationId )
    const { message, image, conversationId } = req.body;

    if (!currentUser?.id || !currentUser?.email) {
      console.log("sjakdflj");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newMessage = await prisma.message.create({
        data: {
          body: message,
          image: image,
          conversation: {
            connect: {
              id: conversationId,
            },
          },
          sender: {
            connect: {
              id: currentUser.id,
            },
          },
          seen: {
            connect: {
              id: currentUser.id,
            },
          },
        },
        include: {
          seen: true,
          sender: true,
        },
      });
      

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });
    // console.log("newMessage", newMessage);
    return res.json(newMessage);
  } catch (error: any) {
    console.log("Messages", error.message);
  }
};

export default Messages;
