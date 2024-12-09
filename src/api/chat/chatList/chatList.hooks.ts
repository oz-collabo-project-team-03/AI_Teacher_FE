import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { ChatListResponseDto } from './chatListType';
import { getChatListAPI } from './chatListAPI';

export const useGetChatListQuery = (
  page: number = 1,
  options?: UseQueryOptions<ChatListResponseDto[], Error, ChatListResponseDto[], [string, number]>
) => {
  return useQuery<ChatListResponseDto[], Error, ChatListResponseDto[], [string, number]>({
    queryKey: ['chatList', page],
    queryFn: () => getChatListAPI(page),
    ...options,
  });
};
