// ConversationsList.tsx
import React, { FC } from "react";

interface Conversations {
  id: string;
  createdAt: string;
  lastMessageAt: string;
  name: string;
  isGroup: boolean;
  messages: any[];
}

interface ConversationsListProps {
  initialItems: Conversations[];
}

const ConversationsList: FC<ConversationsListProps> = ({ initialItems }) => {
  return <div>ConversationsList</div>;
};

export default ConversationsList;
