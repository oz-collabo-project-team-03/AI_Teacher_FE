import { ChatHelpListResponse } from './chatHelpListType';
import axiosInstance from '@/api/axiosInstance';

export const getChatHelpAPI = async (page: number = 1) => {
  try {
    const { data, status } = await axiosInstance.get<ChatHelpListResponse>('/teacher/helps', {
      params: { page },
    });

    // console.log('[API 응답 데이터]', data);

    if (status !== 200 || !Array.isArray(data)) {
      throw new Error('올바른 데이터 형식이 아닙니다.');
    }

    return data;
  } catch (error) {
    console.error('[API 호출 에러]', error);
    throw error;
  }
};
