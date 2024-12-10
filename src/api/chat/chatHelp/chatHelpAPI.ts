import { ChatHelpRequestParams, ChatHelpResponseDto } from './chatHelpType';

import axiosInstance from '@/api/axiosInstance';

export const patchChatHelpAPI = async (
  room_id: number,
  helpData: ChatHelpRequestParams
): Promise<ChatHelpResponseDto> => {
  try {
    const response = await axiosInstance.patch<ChatHelpResponseDto>(
      `/chat/help/${room_id}`,
      helpData
    );

    if (response.data) {
      return response.data; 
    }

    throw new Error('서버 응답 형식이 올바르지 않습니다');
  } catch (error) {
    throw error;
  }
};