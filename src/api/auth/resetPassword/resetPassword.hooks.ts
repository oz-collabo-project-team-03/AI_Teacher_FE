import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { resetPasswordAPI } from './resetPasswordAPI';
import {
  ResetPasswordParams,
  ResetPasswordResponseDto,
} from './resetPasswordType';

export const useResetPasswordMutation = (
  options?: UseMutationOptions<
    ResetPasswordResponseDto, // 성공 시 반환 타입
    Error, // 에러 타입
    ResetPasswordParams // 요청 데이터 타입
  >
) => {
  return useMutation({
    mutationFn: resetPasswordAPI,
    ...options,
  });
};
