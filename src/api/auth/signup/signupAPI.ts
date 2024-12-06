import { GetSignupResponse, SignupRequestParams } from '@/types/signupType';

import axiosInstance from '@/api/axiosInstance';

export const signupAPI = async (
  userData: SignupRequestParams
): Promise<GetSignupResponse> => {
  const response = await axiosInstance.post<GetSignupResponse>(
    '/auth/register',
    userData
  );
  return response.data;
};
