import axiosInstance from '@/api/axiosInstance';
import {
  VerifyPasswordRequestParams,
  VerifyPasswordResponseDto,
} from './verifyPasswordType';

export const verifyPasswordAPI = async (
  password: VerifyPasswordRequestParams
): Promise<VerifyPasswordResponseDto> => {
  const response = await axiosInstance.post<VerifyPasswordResponseDto>(
    '/auth/verify/password',
    password
  );
  return response.data;
};
