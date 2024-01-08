import { FC, ReactNode } from "react";
import SignOut from "../../AuthHome/SignOut/SignOut";

import UsersBar from "../ChatBar/UsersBar";

interface AuthFormProps {
  isLogged: boolean;
  updateIsLogged: (value: boolean) => void;
}

const SideBar: FC<AuthFormProps> = ({ isLogged, updateIsLogged },{children}:{
    children: ReactNode;
}) => {
  return (
    <div className="bg-gray-200 h-screen">
      <UsersBar>
        {children}
      </UsersBar>
        <SignOut isLogged={isLogged} updateIsLogged={updateIsLogged} />
    </div>
  );
};

export default SideBar;
