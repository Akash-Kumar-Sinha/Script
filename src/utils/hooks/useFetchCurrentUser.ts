import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SERVER_URL = process.env.REACT_APP_SERVER_PAGE_URL;

const useFetchCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          const authResponse = await fetch(`${SERVER_URL}/api/success`, {
            credentials: "include",
          });
          const { user: newUser, token: newToken } = await authResponse.json();

          setCurrentUser(newUser);
          localStorage.setItem("token", newToken);

          return;
        } else {
          const response = await fetch(`${SERVER_URL}/api/currentuser`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCurrentUser((await response.json()).user);
        }
      } catch (error) {
        // navigate("/");
        toast.error("useFetchCurrentUser: Invalid Credentials!");
        console.error("Fetch Current User Error:", error);
      }
    };

    fetchCurrentUser();
  }, [navigate, setCurrentUser]);

  return currentUser;
};

export default useFetchCurrentUser;
