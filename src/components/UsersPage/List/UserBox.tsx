import { useCallback, useState, FC } from "react";
import { useNavigate } from "react-router-dom";

import Avatars from "../Users/Avatar";
import LoadingModal from "../../Loading/LoadingModal";

const SERVER_URL = process.env.REACT_APP_SERVER_PAGE_URL;

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

interface UserBoxProps {
  data: User;
}

const UserBox: FC<UserBoxProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleClick = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetch(`${SERVER_URL}/api/conversations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: data.id }),
      });
      if (response.ok) {
        const responseData = await response.json();
        navigate(`/conversations/${responseData.id}`);
      } else {
        console.error("Unsuccessful response:", response.status);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [data.id, navigate, setIsLoading]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="
        w-full 
        relative 
        flex 
        items-center 
        space-x-3 
        bg-gray-300 
        p-3 
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
      "
      >
        <Avatars user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
