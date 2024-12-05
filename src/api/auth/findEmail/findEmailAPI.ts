import axiosInstance from '@/api/axiosInstance';
import { FindEmailParams, GetFindEmailResponse } from './findEmailType';

export const findEmailAPI = async (
  findEmailData: FindEmailParams
): Promise<GetFindEmailResponse> => {
  const response = await axiosInstance.post<GetFindEmailResponse>(
    '/auth/find/email',
    findEmailData
  );
  return response.data;
};
