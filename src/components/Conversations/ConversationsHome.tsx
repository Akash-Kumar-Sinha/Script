import useConversation from "../../utils/hooks/useConversation";
import ConversationsLayout from "./List/ConversationsLayout";

const ConversationsHome = () => {
  const { isOpen } = useConversation();
  return (
    // @ts-ignore
    <ConversationsLayout>

    </ConversationsLayout>
  );
};

export default ConversationsHome;