import { FC } from "react";
import { Button } from "../../../@/components/ui/button";
import toast from "react-hot-toast";

interface AuthFormProps {
  isLogged: boolean;
  updateIsLogged: (value: boolean) => void;
}
const SignOut: FC<AuthFormProps> = ({ isLogged, updateIsLogged }) => {
  return (
    <div>
      <Button
        onClick={() => {
          updateIsLogged(false);
          toast.success("Logged Out");
        }}
      >
        Sign out
      </Button>
    </div>
  );
};

export default SignOut;
