import axiosInstance from '@/api/axiosInstance';
import {
  GetResetPasswordResponse,
  ResetPasswordParams,
} from './resetPasswordType';

export const resetPasswordAPI = async (
  resetPasswordData: ResetPasswordParams
): Promise<GetResetPasswordResponse> => {
  const response = await axiosInstance.post<GetResetPasswordResponse>(
    '/auth/reset/password',
    resetPasswordData
  );
  return response.data;
};
