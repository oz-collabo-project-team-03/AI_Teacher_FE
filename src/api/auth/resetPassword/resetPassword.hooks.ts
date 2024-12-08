import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { resetPasswordAPI } from './resetPasswordAPI';
import {
  GetResetPasswordResponse,
  ResetPasswordParams,
} from './resetPasswordType';
import { ApiError } from '@/types/apiErrorType';

export const usePostResetPasswordMutation = (
  options?: UseMutationOptions<
    GetResetPasswordResponse, // 성공 시 반환 타입
    ApiError, // 에러 타입
    ResetPasswordParams // 요청 데이터 타입
  >
) => {
  return useMutation({
    mutationFn: resetPasswordAPI,
    ...options,
  });
};
