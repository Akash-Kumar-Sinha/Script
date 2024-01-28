import React from "react";
import clsx from "clsx";
import useConversation from "../../utils/hooks/useConversation";
import ConversationsLayout from "./List/ConversationsLayout";

const ConversationsHome = () => {
  const { isOpen } = useConversation();
  return (
    <ConversationsLayout>

    </ConversationsLayout>
  );
};

export default ConversationsHome;
