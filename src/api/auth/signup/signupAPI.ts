import axiosInstance from '@/api/axiosInstance';
import { SignupRequestParams, GetSignupResponse } from '@/types/signupType';

export const signupAPI = async (
  userData: SignupRequestParams
): Promise<GetSignupResponse> => {
  const response = await axiosInstance.post<GetSignupResponse>(
    '/auth/register',
    userData
  );
  return response.data;
};
