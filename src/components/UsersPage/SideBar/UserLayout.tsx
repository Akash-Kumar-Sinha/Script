// layout.tsx
import { ReactNode } from "react";

import SideBar from "./SideBar";

const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SideBar>
      <div>{children}</div>
    </SideBar>
  );
};

export default UserLayout;
