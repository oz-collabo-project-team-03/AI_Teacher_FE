import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { ChatMessageRequestParams } from './chatMessagesType';
import { ChatRoomInfoResponseDto } from '@/types/chat';
import { getChatMessagesAPI } from './chatMessagesAPI';

export const useGetChatMessagesQuery = (
  params: ChatMessageRequestParams,
  options?: UseQueryOptions<
    ChatRoomInfoResponseDto,
    Error,
    ChatRoomInfoResponseDto,
    [string, ChatMessageRequestParams]
  >
) => {
  return useQuery<ChatRoomInfoResponseDto, Error, ChatRoomInfoResponseDto, [string, ChatMessageRequestParams]>({
    queryKey: ['chatMessages', params],
    queryFn: () => getChatMessagesAPI(params),
    ...options,
  });
};
