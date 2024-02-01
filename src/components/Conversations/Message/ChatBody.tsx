import React, { FC, useState, useRef, useEffect } from "react";
import { FullMessageType } from "../../../utils/Types";
import useConversation from "../../../utils/hooks/useConversation";
import MessageBox from "./MessageBox";
import axios from "axios";

interface ChatBodyProps {
  initialMessages: FullMessageType[];
}

const ChatBody: FC<ChatBodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);

  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.log("Token not found");
      throw new Error("Token not found");
    }
  
    axios.post(
      `http://localhost:8000/api/${conversationId}/seen`,
      { conversationId },
      {
        headers: {
          Authorization: token,
        },
      }
      
    )
    .catch(error => {
      console.error("Error while marking conversation as seen:", error.message);
    });
  }, [conversationId]);
  

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default ChatBody;
