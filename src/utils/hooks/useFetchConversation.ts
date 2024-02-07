import { useEffect, useState } from "react";
import axios from "axios";

import useFetchCurrentUser from "./useFetchCurrentUser";
import { FullConversationType } from "../Types";
import useConversation from "./useConversation";

const useFetchConversation = () => {
  const id = useConversation()
  const currentUserData = useFetchCurrentUser();
  const { user } = currentUserData || { user: { email: "" } };
  const userEmail = user.email;
  const [conversations, setConversations] = useState<FullConversationType[]>([]);

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
  }, [userEmail,conversations,id]);

  return conversations;
};

export default useFetchConversation;
