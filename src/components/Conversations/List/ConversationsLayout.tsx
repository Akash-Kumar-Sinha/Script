import React, { useEffect, useState } from "react";
import axios from "axios";

import SideBar from "../../SideBar/SideBar";
import ChatBar from "../../ChatBar/ChatBar";
import ConversationsList from "./ConversationsList";
import useFetchConversation from "../../../utils/hooks/useFetchConversation";
import useFetchCurrentUser from "../../../utils/hooks/useFetchCurrentUser";
import LoadingModal from "../../LoadingIcon/LoadingModal";

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

const ConversationsLayout = ({ children }: { children: React.ReactNode }) => {
  const conversation = useFetchConversation();
  const currentUserData = useFetchCurrentUser();

  const [otherUsers, setOtherUsers] = useState<User[]>([]);
  const { user } = currentUserData ? currentUserData : { user: { email: "" } };
  const userEmail = user.email;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/getUsers?userEmail=${userEmail}`
        );
        setOtherUsers(response.data.users);
      } catch (error) {
        console.error("Error making API call", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userEmail]);

  if (!otherUsers) {
    return <LoadingModal />;
  }

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <div className="flex">
      <SideBar>
        <div>
          <ConversationsList
            otherUsers={otherUsers}
            initialItems={conversation}
          />
          {children}
        </div>
      </SideBar>
      <div className="hidden lg:block lg:pl-80 h-screen w-full">
        <ChatBar />
      </div>
    </div>
  );
};

export default ConversationsLayout;
