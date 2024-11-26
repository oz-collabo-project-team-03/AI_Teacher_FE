import { SignupRequestParams, SignupResponseDto } from '@/types/signupType';
import axios from 'axios';

export const signupAPI = async (
  userData: SignupRequestParams
): Promise<SignupResponseDto> => {
  const response = await axios.post<SignupResponseDto>(
    '/auth/register',
    userData
  );
  return response.data;
};
