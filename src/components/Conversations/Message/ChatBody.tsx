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
  // console.log(conversationId)
  // console.log(messages)

  // useEffect(()=>{
  //   axios.post(`http://localhost:3000/${conversationId}/seen`)
  // },[conversationId])

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
