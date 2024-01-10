import SideBar from "./SideBar/SideBar";
import ChatBar from "./ChatBar/ChatBar";
// import { useAuth } from "../utils/ProtectAuth";

const UsersPage = () => {
  // const { user, login, logout } = useAuth();
  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="w-full">
        <ChatBar />
        {/* {user ? (
        <p>Hello, {user.username}!</p>
      ) : (
        <p>Please log in</p>
      )} */}
      </div>
    </div>
  );
};

export default UsersPage;
