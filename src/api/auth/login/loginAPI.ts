import axiosInstance from '@/api/axiosInstance';
import { GetLoginResponse, LoginRequestParams } from './loginType';

export const loginAPI = async (
  userData: LoginRequestParams
): Promise<GetLoginResponse> => {
  const response = await axiosInstance.post<GetLoginResponse>(
    '/auth/login',
    userData
  );
  return response.data;
};
