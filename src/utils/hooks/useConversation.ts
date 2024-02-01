import  { useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";

const useConversation = () => {
  const params = useParams();
  // console.log(params.id)
  const conversationId = useMemo(() => {
    if (!params?.id) {
      return "";
    }
    return params.id as string;
  }, [params?.id]);
  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  return useMemo(
    () => ({
      isOpen,
      conversationId,
    }),
    [isOpen, conversationId]
  );
};

export default useConversation;
