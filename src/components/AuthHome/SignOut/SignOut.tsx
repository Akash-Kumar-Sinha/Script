// SignOut.js
import { Button } from "../../../@/components/ui/button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const handleLogout = async (navigate: import("react-router-dom").NavigateFunction) => {
  await localStorage.removeItem("token");
  navigate("/");
  toast.success("Logged Out");
};

const SignOut = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        onClick={() => {
          handleLogout(navigate);
        }}
      >
        Sign out
      </Button>
    </div>
  );
};

export default SignOut;
