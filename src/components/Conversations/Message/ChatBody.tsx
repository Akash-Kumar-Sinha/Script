import { FC, useState, useRef, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { FullMessageType } from "../../../utils/Types";
import useConversation from "../../../utils/hooks/useConversation";
import MessageBox from "./MessageBox";
interface ChatBodyProps {
  initialMessages: FullMessageType[];
}

const ChatBody: FC<ChatBodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const { id } = useParams<{ id: string }>();

  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("Token not found");
          throw new Error("Token not found");
        }

        await axios.post(
          `http://localhost:8000/api/${conversationId}/seen`,
          { conversationId },
          {
            headers: {
              Authorization: token,
            },
          }
        );
      } catch (error: any) {
        console.error(
          "Error while marking conversation as seen:",
          error.message
        );
      }
    })();
  }, [conversationId, id]);

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
