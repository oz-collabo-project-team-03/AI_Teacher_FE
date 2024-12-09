import { ChatHelpRequestParams, ChatHelpResponseDto } from './chatHelpType';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { patchChatHelpAPI } from './chatHelpAPI';

export const usePatchChatHelpMutation = (
  options?: UseMutationOptions<ChatHelpResponseDto, Error, { room_id: number; helpData: ChatHelpRequestParams }>
) => {
  return useMutation({
    mutationFn: ({ room_id, helpData }) => patchChatHelpAPI(room_id, helpData),
    ...options,
  });
};
