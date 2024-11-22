import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { loginAPI } from './loginAPI';
import { LoginRequestParams, LoginResponseDto } from './loginType';

export const useLoginMutation = (
  options?: UseMutationOptions<
    LoginResponseDto, // 성공 시 반환 타입
    Error, // 에러 타입
    LoginRequestParams // 요청 데이터 타입
  >
) => {
  return useMutation({
    mutationFn: loginAPI,
    ...options,
  });
};
