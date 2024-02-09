import { FC, useState, useEffect } from "react";
import axios from "axios";

import UserBox from "./UserBox";
import useFetchCurrentUser from "../../../utils/hooks/useFetchCurrentUser";
import { Input } from "../../../@/components/ui/input";
import LoadingModal from "../../Loading/LoadingModal";

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  conversationIds: [];
  seenMessageIds: [];
}

interface UsersListProps {
  items?: User[];
}

const UsersList: FC<UsersListProps> = ({ items = [] }) => {
  const currentUserData = useFetchCurrentUser() as User | null;
  const userEmail = currentUserData?.email; 
  const [users, setUsers] = useState<User[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/getUsers?userEmail=${userEmail}`
        );
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error making API call", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userEmail]);

  // if (isLoading) {
  //   return <LoadingModal />;
  // }

  return (
    <aside
      className="
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200
        block w-full left-0
      "
    >
      <div className="px-5">
        <div className="flex-col">
          <div
            className="
              text-2xl 
              font-bold 
              text-neutral-800 
              py-4
            "
          >
            People
            <div className="bg-gray-300 hover:bg-gray-200">
              <Input type="text" placeholder="Type a command or search..." />
            </div>
          </div>
        </div>
        {isLoading ? (
        <LoadingModal />
      ) : (
        !users.length ? (
          <p>No user Exist</p>
        ) : (
          users.map((user) => <UserBox key={user.id} data={user} />)
        )
      )} 
      </div>
    </aside>
  );
};

export default UsersList;
