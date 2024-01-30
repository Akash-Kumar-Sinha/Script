// useFetchMessage.ts
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import useFetchCurrentUser from "./useFetchCurrentUser";
import { FullConversationType } from "../Types";

interface Message {
  id: string;
  body: string;
  image: string;
  createdAt: string;
  seenIds: string[];
  conversationId: string[];
  senderId: string;
}

interface Conversations {
  id: string;
  createdAt: string;
  lastMessageAt: string;
  name: string;
  isGroup: boolean;
  messages: Message[];
}

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  conversationIds: string[];
  seenMessageIds: string[];
}
const useOtherUsers = (conversation: FullConversationType | { users: User[] }) => {
  const currentUserData = useFetchCurrentUser();

  const otherUser = useMemo(() => {
    const { user } = currentUserData || { user: { email: "" } };
    const currentUserEmail = user.email;

    const otherUser = conversation.users.filter((user) => user.email !== currentUserEmail);
    return otherUser[0];

    }
  ,[currentUserData, conversation.users] );

  return otherUser;
};

export default useOtherUsers;
