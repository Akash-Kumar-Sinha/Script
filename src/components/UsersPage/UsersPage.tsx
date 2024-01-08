import SideBar from "./SideBar/SideBar";
import ChatBar from "./ChatBar/ChatBar";

const UsersPage = () => {
  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="w-full">
        <ChatBar />
      </div>
    </div>
  );
};

export default UsersPage;
