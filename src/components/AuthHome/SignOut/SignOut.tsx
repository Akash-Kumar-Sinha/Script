import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { Button } from "../../../@/components/ui/button";

const SERVER_URL = process.env.REACT_APP_SERVER_PAGE_URL;

export const handleLogout = async (navigate: import("react-router-dom").NavigateFunction) => {
  await localStorage.removeItem("token");
  await fetch(`${SERVER_URL}/api/logout`, {
    credentials: "include",
  });
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
