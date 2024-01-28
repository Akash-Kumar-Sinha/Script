import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useFetchCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Token not found");
        }

        const response = await axios.get(
          "http://localhost:8000/api/currentuser",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setCurrentUser(response.data);
        // console.log("data", response);
      } catch (error) {
        navigate("/");
        toast.error("useFetchCurrentUser: Invalid Credentials!");
        console.error("Fetch Current User Error:", error);
      }
    };

    fetchCurrentUser();
  }, [navigate, setCurrentUser]);

  return currentUser;
};

export default useFetchCurrentUser;
