import axios from "axios";
import React, { useCallback, useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import Avatars from "../Users/Avatar";

interface User {
  id: string;
  name: string | null;
  email: string | null;
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
      const response = await axios.post(
        "http://localhost:8000/api/conversations",
        { userId: data.id },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        navigate(`/conversations/${response.data.id}`);
      } else {
        console.error("Unsuccessful response:", response.status, response.data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [data.id, setIsLoading]);

  return (
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
  );
};

export default UserBox;
