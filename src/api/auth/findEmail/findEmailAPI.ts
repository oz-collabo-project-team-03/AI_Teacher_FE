import axiosInstance from '@/api/axiosInstance';
import { FindEmailParams, FindEmailResponseDto } from './findEmailType';

export const findEmailAPI = async (
  findEmailData: FindEmailParams
): Promise<FindEmailResponseDto> => {
  const response = await axiosInstance.post<FindEmailResponseDto>(
    '/auth/find/email',
    findEmailData
  );
  return response.data;
};
