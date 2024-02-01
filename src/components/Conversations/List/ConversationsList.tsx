// ConversationsList.tsx
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineGroupAdd } from "react-icons/md";
import clsx from "clsx";

import useConversation from "../../../utils/hooks/useConversation";
import ConversationBox from "./ConversationBox";
import { FullConversationType } from "../../../utils/Types";
import useFetchConversation from "../../../utils/hooks/useFetchConversation";

// interface Conversations {
//   id: string;
//   createdAt: string;
//   lastMessageAt: string;
//   name: string;
//   isGroup: boolean;
//   messages: any[];
// }

interface ConversationsListProps {
  initialItems: FullConversationType[];
}

const ConversationsList: FC<ConversationsListProps> = ({ initialItems }) => {
  const [items, setItems] = useState(initialItems);
  const navigate = useNavigate();
  const { conversationId, isOpen } = useConversation();
  const conversations = useFetchConversation()
  useEffect(()=>{

    setItems(conversations)
  },[conversations])
  // console.log("conversations", conversations)
  // console.log("items", initialItems)

  const setIsModalOpen = () => {
    console.log("setIsModalOpen")
  }
  
  return (
    <>
      <aside
        className={clsx(
          `
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
      `,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">
              Messages
            </div>
            <div
              onClick={() => setIsModalOpen()}
              className="
                rounded-full 
                p-2 
                bg-gray-100 
                text-gray-600 
                cursor-pointer 
                hover:opacity-75 
                transition
              "
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationsList;
