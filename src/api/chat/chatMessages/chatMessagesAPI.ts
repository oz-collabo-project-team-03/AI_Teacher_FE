import { ChatMessageRequestParams } from './chatMessagesType';
import { ChatRoomInfoResponseDto } from '@/types/chat';
import axiosInstance from '@/api/axiosInstance';

export const getChatMessagesAPI = async (
  params: ChatMessageRequestParams
): Promise<ChatRoomInfoResponseDto> => {
  const response = await axiosInstance.get<ChatRoomInfoResponseDto>(
    `/chat/${params.room_id}/messages`,
    { params: { page: params.page } }
  );
  return response.data;
};