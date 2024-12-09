import { ChatRoomResponseDto, CreateChatRoomRequestParams } from './createChatRoomType';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { createChatRoomAPI } from './createChatRoomAPI';

export const useCreateChatRoomMutation = (
  options?: UseMutationOptions<ChatRoomResponseDto, Error, CreateChatRoomRequestParams>
) => {
  return useMutation<ChatRoomResponseDto, Error, CreateChatRoomRequestParams>({
    mutationFn: createChatRoomAPI,
    ...options,
  });
};
