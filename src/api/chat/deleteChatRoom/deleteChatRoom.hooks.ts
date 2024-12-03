import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { DeleteChatRoomParams } from './deleteChatRoomType';
import { deleteChatRoomAPI } from './deleteChatRoomAPI';

export const useDeleteChatRoomMutation = (
  options?: UseMutationOptions<void, Error, DeleteChatRoomParams>
) => {
  return useMutation({
    mutationFn: deleteChatRoomAPI,
    ...options,
  });
};
