import axios from "axios";
import React, { useCallback, useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import Avatars from "./Avatar";

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

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", { userId: data.id })
      .then((data) => {
        navigate(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, navigate]);

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
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900">{data.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;