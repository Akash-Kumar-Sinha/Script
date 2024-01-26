import { ReactNode, useEffect, useState } from "react";
import SideBar from "./SideBar";
import useRoutes from "../../utils/hooks/useRoutes";


const UserLayout = ({ children }: { children: ReactNode }) => {

  const routes = useRoutes();

  return (
    <div className="">
      <SideBar>
        
        {children}
      </SideBar>
    </div>
  );
};

export default UserLayout;
