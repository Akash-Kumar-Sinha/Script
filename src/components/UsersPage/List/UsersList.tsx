import { FC, useState, useEffect } from "react";
import UserBox from "./UserBox";
import useFetchCurrentUser from "../../../utils/hooks/useFetchCurrentUser";
import axios from "axios";
import { Input } from "../../../@/components/ui/input";

interface User {
  id: string;
  name: string ;
  email: string;
}

interface UsersListProps {
  items?: User[];
}

const UsersList: FC<UsersListProps> = ({ items = [] }) => {
  const currentUserData = useFetchCurrentUser();
  const [users, setUsers] = useState<User[]>([]);
  const { user } = currentUserData || { user: { email: "" } };
  const userEmail = user.email;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/getUsers?userEmail=${userEmail}`
        );
        setUsers(response.data.users);
        // console.log("API call successful");
      } catch (error) {
        console.error("Error making API call", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userEmail]);

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

        {!users.length ? (
          <p>No user Exist</p>
        ) : (
          users.map((user) => <UserBox key={user.id} data={user} />)
        )}
      </div>
    </aside>
  );
};

export default UsersList;
