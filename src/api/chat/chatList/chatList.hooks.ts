import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { ChatListData } from './chatListType';
import { getChatListAPI } from './chatListAPI';

export const useGetChatListQuery = (
  page: number = 1,
  options?: UseQueryOptions<ChatListData[], Error, ChatListData[], [string, number]>
) => {
  return useQuery<ChatListData[], Error, ChatListData[], [string, number]>({
    queryKey: ['chatList', page],
    queryFn: () => getChatListAPI(page),
    ...options,
  });
};
