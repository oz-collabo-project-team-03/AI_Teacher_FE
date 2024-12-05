import axiosInstance from '@/api/axiosInstance';
import { CancelMemberResponseDto } from './cancelType';

export const cancelMemberAPI = async (): Promise<CancelMemberResponseDto> => {
  const response =
    await axiosInstance.post<CancelMemberResponseDto>('/users/deactivate');
  return response.data;
};
