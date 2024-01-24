import ChatBar from "../ChatBar/ChatBar";
import MobileFooter from "./SideBar/MobileBar/MobileFooter";
import UserLayout from "./SideBar/UserLayout";

const UsersPage = () => {
  return (
    <>
      <div className="md:h-96">
        <div>
          <MobileFooter />
        </div>
        <div className="flex flex-col md:flex-row h-full md:h-[94vh] lg:h-screen">
          <div className="bg-gray-300 md:hidden lg:block">
            <UserLayout>Akash UserLayout</UserLayout>
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
