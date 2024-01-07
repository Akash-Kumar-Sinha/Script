import { FC } from "react";
import SideBar from "./SideBar/SideBar";
import ChatBar from "./ChatBar/ChatBar";


interface AuthFormProps {
  isLogged: boolean;
  updateIsLogged: (value: boolean) => void;
}

const UsersPage: FC<AuthFormProps> = ({ isLogged, updateIsLogged }) => {
  return (
    <div className="flex">
      <div>
        <SideBar isLogged={isLogged} updateIsLogged={updateIsLogged} />
      </div>
      <div className="w-full">
        <ChatBar/>
      </div>
    </div>
  );
};

export default UsersPage;
