import {
  InfiniteData,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';

import { ChatMessageRequestParams } from './chatMessagesType';
import { ChatRoomInfoResponseDto } from '@/types/chat';
import { getChatMessagesAPI } from './chatMessagesAPI';

export const useChatMessagesInfiniteQuery = (
  params: ChatMessageRequestParams,
  options?: UseInfiniteQueryOptions<
    ChatRoomInfoResponseDto,
    Error,
    InfiniteData<ChatRoomInfoResponseDto>
  >
) => {
  return useInfiniteQuery({
    queryKey: ['chatMessages', params],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getChatMessagesAPI({ ...params, page: pageParam as number});

      return response;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.pagination.next) {
        return undefined;
      }
      return lastPage.pagination.next;
    },
    initialPageParam: 1,
    ...options,
  });
};
