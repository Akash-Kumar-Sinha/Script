import { FC } from "react";
import SignOut from "../../AuthHome/SignOut/SignOut";
// import { Sidebar } from "lucide-react";

import UsersBar from "../ChatBar/UsersBar";

interface AuthFormProps {
  isLogged: boolean;
  updateIsLogged: (value: boolean) => void;
}

const SideBar: FC<AuthFormProps> = ({ isLogged, updateIsLogged }) => {
  return (
    <div className="bg-slate-200 h-screen">
      <UsersBar>
        <SignOut isLogged={isLogged} updateIsLogged={updateIsLogged} />
      </UsersBar>
    </div>
  );
};

export default SideBar;
