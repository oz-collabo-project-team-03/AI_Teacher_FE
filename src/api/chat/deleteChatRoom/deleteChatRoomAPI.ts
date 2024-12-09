import { DeleteChatRoomRequestParams, DeleteChatRoomResponseDto } from './deleteChatRoomType';

import axiosInstance from '@/api/axiosInstance';

export const deleteChatRoomAPI = async (
  params: DeleteChatRoomRequestParams
): Promise<DeleteChatRoomResponseDto> => {
  const { room_id } = params;

  try {
    const response = await axiosInstance.delete(`/chat/room/${room_id}`);

    if (response.status === 204) {
      return;
    }

    throw new Error('서버 응답 형식이 올바르지 않습니다');
  } catch (error) {
    console.error('채팅방 삭제 중 오류:', error);
    throw error;
  }
};
