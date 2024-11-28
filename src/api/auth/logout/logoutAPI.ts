import axiosInstance from '@/api/axiosInstance';
import { LogoutRequestParams, LogoutResponseDto } from './logoutType';

export const logoutAPI = async (
  userData: LogoutRequestParams
): Promise<LogoutResponseDto> => {
  const response = await axiosInstance.post<LogoutResponseDto>(
    '/auth/logout',
    userData
  );
  return response.data;
};
