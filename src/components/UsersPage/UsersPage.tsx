import ChatBar from "../ChatBar/ChatBar";
import DesktopSidebar from "./SideBar/DektopBar/DesktopSidebar";
import MobileFooter from "./SideBar/MobileBar/MobileFooter";
import UserLayout from "./SideBar/UserLayout";

const UsersPage = () => {
  return (
    <>
      <div className="md:h-96">
        <div>
          <MobileFooter />
          <DesktopSidebar />

        </div>
        <div className="flex flex-col md:flex-row h-full md:h-[94vh] lg:h-screen">
          <div className="bg-gray-300 md:hidden lg:block">
            <UserLayout>
              
            </UserLayout>
          </div>

          <div className="relative w-full">
            <ChatBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersPage;
