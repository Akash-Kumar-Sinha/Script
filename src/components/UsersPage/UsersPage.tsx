import ChatBar from "./ChatBar/ChatBar";
import MobileFooter from "./SideBar/MobileFooter";
import UserLayout from "./SideBar/UserLayout";

const UsersPage = () => {
  return (
    <>
      <div className="md:h-96">
        <div>
          <MobileFooter />
        </div>
        <div className="flex flex-col md:flex-row h-full md:h-[94vh] lg:h-screen">
        <div className="bg-slate-500 md:w-1/4">
            <UserLayout>Akash UserLayout</UserLayout>
          </div>

          <div className="relative w-full md:w-3/4">
            <ChatBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersPage;
