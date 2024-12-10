import { ChatHelpListRequestParams } from './chatListType';
import axiosInstance from '@/api/axiosInstance';

export const getChatListAPI = async (page: number = 1) => {
  try {
    const { data, status } = await axiosInstance.get<ChatHelpListRequestParams>(
      '/chat/students',
      { params: { page } }
    );


    if (status !== 200 || !Array.isArray(data)) {
      throw new Error('올바른 데이터 형식이 아닙니다.');
    }

    return data;
  } catch (error) {
    throw error;
  }
};
