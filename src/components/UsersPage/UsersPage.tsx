import { FC } from "react";
import SignOut from "../AuthHome/SignOut/SignOut";

interface AuthFormProps {
  isLogged: boolean;
  updateIsLogged: (value: boolean) => void;
}

const UsersPage: FC<AuthFormProps> = ({ isLogged, updateIsLogged }) => {
  return (
    <div>
      <SignOut isLogged={isLogged} updateIsLogged={updateIsLogged} />
    </div>
  );
};

export default UsersPage;
