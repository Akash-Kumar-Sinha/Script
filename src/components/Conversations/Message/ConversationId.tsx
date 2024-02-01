import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatBar from "../../ChatBar/ChatBar";
import Header from "./Header";
import ChatBody from "./ChatBody";
import Form from "./Form";

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

interface Conversation {
  id: string;
  createdAt: string;
  lastMessageAt: string;
  name: string;
  isGroup: boolean;
  messages: any[];
}

const ConversationId = () => {
  const conversationId = useParams();
  const [loading, setLoading] = useState(true);
  const [conversation, setConversation] = useState<
    Conversation & { user: User[] }
  >({
    id: "",
    createdAt: "",
    lastMessageAt: "",
    name: "",
    isGroup: false,
    messages: [],
    user: [],
  });

  const [message, setMessage] = useState();

  // console.log("conversationId", conversationId.id);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        if (!conversationId) {
          throw new Error("Conversation ID not found");
        }

        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Token not found");
        }

        try {
          const conversationResponse = await axios.get(
            `http://localhost:8000/api/getconversationsbyid/${conversationId.id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          setConversation(conversationResponse.data);
        } catch (error) {
          console.log("conversationResponse", error);
        }

        try {
          const messageResponse = await axios.get(
            `http://localhost:8000/api/getmessage/${conversationId.id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          setMessage(messageResponse.data);
        } catch (error) {
          console.log("messageResponse", error);
        }
      } catch (error: any) {
        console.log("error", error.message || "Error fetching conversation");
      } finally {
        setLoading(false);
      }
    };

    fetchConversation();
  }, [conversationId]);

  // console.log("conversation", conversation);
  // console.log("Message", message);

  if (loading) {
    <p>Loading</p>;
  }

  if (!message) {
    return (
      <div className="lg:pl-80 h-screen">
        <div className="h-full flex flex-col">
          <ChatBar />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-screen">
      <div className="h-screen flex flex-col">
        <Header conversation={conversation} />
        <ChatBody />
        <Form/>
      </div>
    </div>
  );
};

export default ConversationId;
