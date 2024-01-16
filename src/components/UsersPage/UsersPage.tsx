import SignOut from "../AuthHome/SignOut/SignOut";
import ChatBar from "./ChatBar/ChatBar";
import UserLayout from "./SideBar/UserLayout";

const UsersPage = () => {
  // const { user, login, logout } = useAuth();
  return (
    <div className="flex">
      <div className="bg-slate-500">
        <UserLayout>
          <SignOut/>
        </UserLayout>
      </div>
        ``
      <div className="w-full h-screen">
        <ChatBar />
      </div>
    </div>
  );
};

export default UsersPage;
