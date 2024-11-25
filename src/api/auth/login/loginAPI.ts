import axiosInstance from '@/api/axiosInstance';
import { LoginRequestParams, LoginResponseDto } from './loginType';

export const loginAPI = async (
  userData: LoginRequestParams
): Promise<LoginResponseDto> => {
  const response = await axiosInstance.post<LoginResponseDto>(
    '/auth/login',
    userData
  );
  return response.data;
};
