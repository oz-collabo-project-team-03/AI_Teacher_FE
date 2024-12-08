import { GetSignupResponse, SignupRequestParams } from '@/types/signupType';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { signupAPI } from './signupAPI';
import { ApiError } from '@/types/apiErrorType';

export const usePostSignupMutation = (
  options?: UseMutationOptions<
    GetSignupResponse, // 성공 시 반환 타입
    ApiError, // 에러 타입
    SignupRequestParams // 요청 데이터 타입
  >
) => {
  return useMutation({
    mutationFn: signupAPI,
    ...options,
  });
};
