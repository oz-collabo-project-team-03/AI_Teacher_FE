import { ChatRoomData, HelpResponse } from './chatHelpType';

import axiosInstance from '@/api/axiosInstance';

export const patchChatHelpAPI = async (
  room_id: number,
  helpData: HelpResponse
): Promise<ChatRoomData> => {
  try {
    const response = await axiosInstance.patch<ChatRoomData>(
      `/chat/help/${room_id}`,
      helpData
    );
    // console.log('요청 데이터:', helpData);

    if (response.data) {
      return response.data; 
    }

    throw new Error('서버 응답 형식이 올바르지 않습니다');
  } catch (error) {
    console.error('도움 요청 업데이트 중 오류:', error);
    throw error;
  }
};