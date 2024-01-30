// ConversationsLayout.tsx
import React from 'react';
import SideBar from '../../SideBar/SideBar';
import ChatBar from '../../ChatBar/ChatBar';
import ConversationsList from './ConversationsList';
import useFetchConversation from '../../../utils/hooks/useFetchConversation';

const ConversationsLayout = ({ children }: { children: React.ReactNode }) => {
  const conversation = useFetchConversation();

  // console.log("ConversationsLayout", conversation)

  return (
    <div className="flex">
      <SideBar>
        <div>
          <ConversationsList initialItems={conversation} />
          {children}
        </div>
      </SideBar>
      <div className="hidden lg:block lg:pl-80 h-screen w-full">
        <ChatBar />
      </div>
    </div>
  );
};

export default ConversationsLayout;