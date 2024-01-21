import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../@/components/ui/avatar";
import useFetchCurrentUser from "../utils/hooks/useFetchCurrentUser";

const Avatars = () => {
  const currentUserData = useFetchCurrentUser() as unknown as {
    user: {
      image: string | null;
    };
  };
  // console.log("currentUserData", currentUserData);

  const user = (
    currentUserData as {
      user: {
        image: string | null;
      };
    }
  )?.user;

  const imageUrl = user?.image || "placeholder.jpg";

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
