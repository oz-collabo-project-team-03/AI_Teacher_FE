import { ChatRoomData, CreateChatRoomResponse } from './createChatRoomType';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { createChatRoomAPI } from './createChatRoomAPI';

export const useCreateChatRoomMutation = (
  options?: UseMutationOptions<ChatRoomData, Error, CreateChatRoomResponse>
) => {
  return useMutation<ChatRoomData, Error, CreateChatRoomResponse>({
    mutationFn: createChatRoomAPI,
    ...options,
  });
};
