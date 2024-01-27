import { FC } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../@/components/ui/avatar";
import useFetchCurrentUser from "../../utils/hooks/useFetchCurrentUser";

interface User {
  id: string;
  name: string | null;
  email: string | null;
}

interface AvatarsProps {
  user?: User; // Update to accept a single User, not an array
}

const Avatars: FC<AvatarsProps> = ({ user }) => {
  const currentUserData = useFetchCurrentUser() as unknown as {
    activeUser: {
      image: string | null;
    };
  };

  const activeUser = (
    currentUserData as {
      activeUser: {
        image: string | null;
      };
    }
  )?.activeUser;

  // console.log(currentUserData);
  

  const imageUrl = activeUser?.image || "placeholder.jpg";

  return (
    <div className="relative">
      <Avatar>
        <AvatarImage src={imageUrl} />
        <AvatarFallback>PF</AvatarFallback>
      </Avatar>
      {/* {isActive ? (  */}
      <span
        className="
            absolute
            block
            rounded-full
            bg-green-500
            ring-2
            ring-white
            top-0
            right-0
            h-2
            w-2
            md:h-3
            md:w-3
          "
      />
      {/* ) : null} */}
    </div>
  );
};

export default Avatars;
