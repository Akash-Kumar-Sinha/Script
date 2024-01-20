import { useState, useEffect } from "react";
import ChatBar from "./ChatBar/ChatBar";
import UserLayout from "./SideBar/UserLayout";
import DesktopSidebar from "./SideBar/DesktopSidebar";

const UsersPage = () => {
  
  return (
    <>
      <div className="flex">
        <div className="mr-20">
          <DesktopSidebar
          //  currentUser={currentUser}
           />
        </div>

        <div className="bg-slate-500">
          <UserLayout>
            kdsa
          </UserLayout>
        </div>

        <div className="relative w-full h-screen">
          <ChatBar />
        </div>
      </div>
    </>
  );
};

export default UsersPage;
