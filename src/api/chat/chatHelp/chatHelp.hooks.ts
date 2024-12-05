import { ChatRoomData, HelpResponse } from './chatHelpType';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { patchChatHelpAPI } from './chatHelpAPI';

export const usePatchChatHelpMutation = (
  options?: UseMutationOptions<ChatRoomData, Error, { room_id: string; helpData: HelpResponse }>
) => {
  return useMutation({
    mutationFn: ({ room_id, helpData }) => patchChatHelpAPI(room_id, helpData),
    ...options,
  });
};
