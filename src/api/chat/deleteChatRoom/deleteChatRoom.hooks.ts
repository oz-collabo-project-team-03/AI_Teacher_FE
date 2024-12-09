import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { DeleteChatRoomRequestParams } from './deleteChatRoomType';
import { deleteChatRoomAPI } from './deleteChatRoomAPI';

export const useDeleteChatRoomMutation = (
  options?: UseMutationOptions<void, Error, DeleteChatRoomRequestParams>
) => {
  return useMutation({
    mutationFn: deleteChatRoomAPI,
    ...options,
  });
};
