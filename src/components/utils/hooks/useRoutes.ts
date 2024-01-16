import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import {HiChat} from "react-icons/hi";
import {HiArrowLeftOnRectangle, HiUsers} from "react-icons/hi2";

// import signout

import SignOut from "../../AuthHome/SignOut/SignOut";
import useConversation from "./useConversation";

const useRoutes=()=>{
    const {pathname} = useLocation();
    const {conversationId} = useConversation();

    const routes = useMemo(()=>[{
        label: 'chat',
        // href: '/conversations',
        href: '/userspage',
        icon: HiChat,
        active: pathname === '/conversations' || !!conversationId
    },
    {
        label: 'Users',
        href: '/users',
        // href: '/userspage',
        icon: HiUsers,
        active: pathname === '/users'
    },
    {
        label: 'Logout',
        // href: '#',
        href: '/',
        onClick: ()=>SignOut(),
        icon: HiArrowLeftOnRectangle
    }
],[pathname,conversationId])

return routes;
}

export default useRoutes;