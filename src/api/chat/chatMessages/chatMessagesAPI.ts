import { ChatMessageRequestParams } from './chatMessagesType';
import { ChatRoomInfoResponseDto } from '@/types/chat';
import axiosInstance from '@/api/axiosInstance';

export const getChatMessagesAPI = async (params: ChatMessageRequestParams): Promise<ChatRoomInfoResponseDto> => {
  try {
    const { data, status } = await axiosInstance.get<ChatRoomInfoResponseDto>(
      `/chat/${params.room_id}/messages`,
      { params: { page: params.page } }
    );

    console.log('[Chat 메세지 API 응답 데이터]', data);

    if (status !== 200 || !data || !Array.isArray(data.messages)) {
      throw new Error('올바른 응답 형식이 아닙니다.');
    }

    return data;
  } catch (error) {
    console.error('[채팅 메시지 API 호출 에러]', error);
    throw error;
  }
};
