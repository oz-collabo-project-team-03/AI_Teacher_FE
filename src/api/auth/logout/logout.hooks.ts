import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { logoutAPI } from './logoutAPI';
import { LogoutRequestParams, LogoutResponseDto } from './logoutType';

export const usePostLogoutMutation = (
  options?: UseMutationOptions<
    LogoutResponseDto, // 성공 시 반환 타입
    Error, // 에러 타입
    LogoutRequestParams // 요청 데이터 타입
  >
) => {
  return useMutation({
    mutationFn: logoutAPI,
    ...options,
  });
};
