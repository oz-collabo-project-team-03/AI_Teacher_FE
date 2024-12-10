import { ChatMessageData } from '@/types/chat';
import { useCallback } from 'react';

export const useMergeMessages = () => {
  const mergeMessages = useCallback(
    (
      prevMessages: ChatMessageData [],
      newMessages: ChatMessageData []
    ) => {
      const allMessages = [...newMessages, ...prevMessages];
      const uniqueMessages = Array.from(
        new Map(allMessages.map((msg) => [msg.message + msg.timestamp, msg]))
          .values()
      );
      return uniqueMessages.reverse();
    },
    []
  );

  return { mergeMessages };
};
