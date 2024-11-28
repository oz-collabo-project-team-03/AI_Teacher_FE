import axiosInstance from '@/api/axiosInstance';
import {
  ResetPasswordParams,
  ResetPasswordResponseDto,
} from './resetPasswordType';

export const resetPasswordAPI = async (
  resetPasswordData: ResetPasswordParams
): Promise<ResetPasswordResponseDto> => {
  const response = await axiosInstance.post<ResetPasswordResponseDto>(
    '/auth/verify/password',
    resetPasswordData
  );
  return response.data;
};
