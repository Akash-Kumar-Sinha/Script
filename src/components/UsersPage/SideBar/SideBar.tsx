import SignOut from "../../AuthHome/SignOut/SignOut";

import UsersBar from "../ChatBar/UsersBar";

const SideBar = () => {
  return (
    <div className="bg-gray-200 h-screen">
      <UsersBar>{/* {children} */}</UsersBar>
      <SignOut />
    </div>
  );
};

export default SideBar;
