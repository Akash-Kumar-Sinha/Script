import { ReactNode, useEffect, useState } from "react";
import axios from "axios";

import SideBar from "../../SideBar/SideBar";
import useRoutes from "../../../utils/hooks/useRoutes";
import useFetchCurrentUser from "../../../utils/hooks/useFetchCurrentUser";
import UsersList from "./UsersList";
import ChatBar from "../../ChatBar/ChatBar";
import LoadingModal from "../../Loading/LoadingModal";

const UserLayout = ({ children }: { children?: ReactNode }) => {
  const routes = useRoutes();
  const currentUserData = useFetchCurrentUser();
  const [users, setUsers] = useState<[]>([]);
  const { user } = currentUserData ? currentUserData : { user: { email: "" } };
  const userEmail = user.email;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/getUsers?userEmail=${userEmail}`
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error making API call", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userEmail]);

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <div className="flex">
      <SideBar>
          <div>
            <UsersList items={users} />
            {children}
          </div>
      </SideBar>
      <div className="hidden lg:block lg:pl-80 h-screen w-full">
        <ChatBar />
      </div>
    </div>
  );
};

export default UserLayout;  