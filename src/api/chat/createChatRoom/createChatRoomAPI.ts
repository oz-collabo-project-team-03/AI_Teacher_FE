import { ChatRoomData, CreateChatRoomResponse } from './createChatRoomType';

import axiosInstance from '@/api/axiosInstance';

export const createChatRoomAPI = async (
  userData: CreateChatRoomResponse
): Promise<ChatRoomData> => {
  try {
    const response = await axiosInstance.post<ChatRoomData>(
      '/chat/room',
      userData
    );

    if (response.data && response.data.room_id) {
      return response.data;
    }

    throw new Error('서버 응답 형식이 올바르지 않습니다');
  } catch (error) {
    console.error('채팅방 생성 중 오류:', error);
    throw error;
  }
};