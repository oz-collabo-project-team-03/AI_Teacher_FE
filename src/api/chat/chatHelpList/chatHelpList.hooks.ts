import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { ChatHelpListData } from './chatHelpListType';
import { getChatHelpAPI } from './chatHelpListAPI';

export const useGetChatHelpQuery = (
  page: number = 1,
  options?: UseQueryOptions<ChatHelpListData[], Error>
) => {
  return useQuery({
    queryKey: ['chatHelpList', page],
    queryFn: async () => {
      const chatHelpList = await getChatHelpAPI(page);
      return chatHelpList;
    },
    ...options,
  });
};
