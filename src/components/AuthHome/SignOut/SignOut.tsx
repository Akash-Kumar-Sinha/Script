import { Button } from "../../../@/components/ui/button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Button
        onClick={() => {
          navigate('/')
          toast.success("Logged Out");
        }}
      >
        Sign out
      </Button>
    </div>
  );
};

export default SignOut;
