import ChatBar from "./ChatBar/ChatBar";
import UserLayout from "./SideBar/UserLayout";

const UsersPage = () => {
  return (
    <>
      <div>

        <div className="flex flex-row">
          <div className="bg-slate-500 ">
            <UserLayout>Akash UserLayout</UserLayout>
          </div>

          <div className="static w-full h-screen">
            <ChatBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersPage;
