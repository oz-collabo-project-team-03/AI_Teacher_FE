import axios from 'axios';
import {
  ResetPasswordParams,
  ResetPasswordResponseDto,
} from './resetPasswordType';

export const resetPasswordAPI = async (
  resetPasswordData: ResetPasswordParams
): Promise<ResetPasswordResponseDto> => {
  const response = await axios.post<ResetPasswordResponseDto>(
    '/auth/reset/password',
    resetPasswordData
  );
  return response.data;
};
