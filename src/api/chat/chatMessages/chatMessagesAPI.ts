import { ChatMessageParams, ChatMessageResponse } from './chatMessagesType';

import axiosInstance from '@/api/axiosInstance';

/**
 * 특정 채팅방의 메시지를 불러오는 API 함수
 * @param params - 채팅방 ID와 페이지네이션 정보
 * @returns ChatMessageResponse - 채팅방 메시지 데이터
 */
export const getChatMessagesAPI = async (params: ChatMessageParams): Promise<ChatMessageResponse> => {
  try {
    const { data, status } = await axiosInstance.get<ChatMessageResponse>(
      `/chat/${params.room_id}/messages`,
      { params: { page: params.page, page_size: params.page_size } }
    );

    console.log('[API 응답 데이터]', data);

    if (status !== 200 || !data) {
      throw new Error('올바른 응답 형식이 아닙니다.');
    }
    return data;
  } catch (error) {
    console.error('[채팅 메시지 API 호출 에러]', error);
    throw error;
  }
};
