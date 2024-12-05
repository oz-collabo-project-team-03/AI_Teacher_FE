import { ChatMessageParams, ChatMessageResponse } from './chatMessagesType';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { getChatMessagesAPI } from './chatMessagesAPI';

export const useGetChatMessagesQuery = (
  params: ChatMessageParams,
  options?: UseQueryOptions<
    ChatMessageResponse,
    Error,
    ChatMessageResponse,
    [string, ChatMessageParams]
  >
) => {
  return useQuery<ChatMessageResponse, Error, ChatMessageResponse, [string, ChatMessageParams]>({
    queryKey: ['chatMessages', params],
    queryFn: () => getChatMessagesAPI(params),
    ...options,
  });
};
