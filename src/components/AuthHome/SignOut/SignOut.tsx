import { Button } from "../../../@/components/ui/button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const navigate = useNavigate();

  const handlelogout = () => {
    navigate("/");
    toast.success("Logged Out");
  };
  return (
    <div>
      <Button
        onClick={() => {
          handlelogout();
        }}
      >
        Sign out
      </Button>
    </div>
  );
};

export default SignOut;
