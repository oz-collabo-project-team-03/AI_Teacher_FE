import { ChatRoomResponseDto, CreateChatRoomRequestParams } from './createChatRoomType';

import axiosInstance from '@/api/axiosInstance';

export const createChatRoomAPI = async (
  userData: CreateChatRoomRequestParams
): Promise<ChatRoomResponseDto> => {
  try {
    const response = await axiosInstance.post<ChatRoomResponseDto>(
      '/chat/room',
      userData
    );

    if (response.data && response.data.room_id) {
      return response.data;
    }

    throw new Error('서버 응답 형식이 올바르지 않습니다');
  } catch (error) {
 
    throw error;
  }
};