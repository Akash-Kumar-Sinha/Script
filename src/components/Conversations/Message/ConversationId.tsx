import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "./Header";
import ChatBody from "./ChatBody";
import Form from "./Form";
import SideBar from "../../SideBar/SideBar";
import ConversationsList from "../List/ConversationsList";
import useFetchCurrentUser from "../../../utils/hooks/useFetchCurrentUser";
import LoadingModal from "../../Loading/LoadingModal";

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

const ConversationId = ({ children }: { children?: React.ReactNode }) => {
  const { id } = useParams<{ id: string }>();
  const [conversation, setConversation] = useState<
    Conversation & { users: User[] }
  >({
    id: "",
    createdAt: "",
    lastMessageAt: "",
    name: "",
    isGroup: false,
    messages: [],
    users: [],
  });
  const [message, setMessage] = useState<any[]>([]);
  const currentUserData = useFetchCurrentUser();
  const [otherUsers, setOtherUsers] = useState<User[]>([]);
  const { user } = currentUserData ? currentUserData : { user: { email: "" } };
  const userEmail = user.email;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found");

        const conversationResponse = await axios.get(
          `http://localhost:8000/api/getconversationsbyid/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setConversation(conversationResponse.data);
        const messageResponse = await axios.get(
          `http://localhost:8000/api/getmessage/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setMessage(messageResponse.data);
        const response = await axios.get(
          `http://localhost:8000/api/getUsers?userEmail=${userEmail}`
        );
        setOtherUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, userEmail]);

  return (
    <>
      {isLoading ? (
        <LoadingModal />
      ) : (
        <div>
          <div className="hidden lg:block">
            <SideBar>
              <div>
                <ConversationsList
                  otherUsers={otherUsers}
                  initialItems={[conversation]}
                />
                {children}
              </div>
            </SideBar>
          </div>
          <div className="lg:pl-96 h-screen">
            <div className="h-screen flex flex-col">
              <Header conversation={conversation} />
              <ChatBody initialMessages={message} />
              <Form />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConversationId;
