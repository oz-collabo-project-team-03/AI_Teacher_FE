import { ChatMessageParams, ChatMessageResponse } from './chatMessagesType';

import axiosInstance from '@/api/axiosInstance';

/**
 * 특정 채팅방의 메시지를 페이지 단위로 불러오는 API 함수
 */
export const getChatMessagesAPI = async (params: ChatMessageParams): Promise<ChatMessageResponse> => {
  try {
    const { data, status } = await axiosInstance.get<ChatMessageResponse>(
      `/chat/${params.room_id}/messages`,
      { params: { page: params.page, page_size: params.page_size } }
    );

    // console.log('[Chat 메세지 API 응답 데이터]', data);

    if (status !== 200 || !data || !Array.isArray(data.messages)) {
      throw new Error('올바른 응답 형식이 아닙니다.');
    }

    return data;
  } catch (error) {
    console.error('[채팅 메시지 API 호출 에러]', error);
    throw error;
  }
};
