import { ReactNode } from "react";

import SideBar from "./SideBar";

const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
     
        <SideBar>
          <div>{children}</div>
        </SideBar>
    
    </div>
  );
};

export default UserLayout;
