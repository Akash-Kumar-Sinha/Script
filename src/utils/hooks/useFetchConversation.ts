// useFetchConversation.ts
import { useEffect, useState } from "react";
import axios from "axios";
import useFetchCurrentUser from "./useFetchCurrentUser";

interface Conversations {
  id: string;
  createdAt: string;
  lastMessageAt: string;
  name: string;
  isGroup: boolean;
  messages: any[];
}

const useFetchConversation = () => {
  const currentUserData = useFetchCurrentUser();
  const { user } = currentUserData || { user: { email: "" } };
  const userEmail = user.email;
  const [conversations, setConversations] = useState<Conversations[]>([]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Token not found");
        }

        const response = await axios.get(
          "http://localhost:8000/api/getconversation",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setConversations(response.data);
        // console.log("data", response);
      } catch (error) {
        console.error("Fetch conversation Error:", error);
      }
    };

    fetchCurrentUser();
  }, [userEmail]);

  return conversations;
};

export default useFetchConversation;
