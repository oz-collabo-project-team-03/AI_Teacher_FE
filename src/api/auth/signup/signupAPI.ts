import axiosInstance from '@/api/axiosInstance';
import { SignupRequestParams, SignupResponseDto } from '@/types/signupType';

export const signupAPI = async (
  userData: SignupRequestParams
): Promise<SignupResponseDto> => {
  const response = await axiosInstance.post<SignupResponseDto>(
    '/auth/register',
    userData
  );
  return response.data;
};
