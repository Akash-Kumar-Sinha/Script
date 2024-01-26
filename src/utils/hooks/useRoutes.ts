import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";

import useConversation from "./useConversation";
import { handleLogout } from "../../components/AuthHome/SignOut/SignOut";

const useRoutes = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "chat",
        href: "/users",
        icon: HiChat,
        active: pathname === "/users",
      },
      {
        label: "Users",
        href: "/userspage",
        icon: HiUsers,
        active: pathname === "/userspage" || !!conversationId,
      },
      {
        label: "Logout",
        href: "#",
        onClick: () => handleLogout(navigate),
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathname, conversationId, navigate]
  );

  return routes;
};

export default useRoutes;
