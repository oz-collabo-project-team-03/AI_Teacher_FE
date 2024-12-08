import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { findEmailAPI } from './findEmailAPI';
import { FindEmailParams, GetFindEmailResponse } from './findEmailType';
import { ApiError } from '@/types/apiErrorType';

export const usePostFindEmailMutation = (
  options?: UseMutationOptions<
    GetFindEmailResponse, // 성공 시 반환 타입
    ApiError, // 에러 타입
    FindEmailParams // 요청 데이터 타입
  >
) => {
  return useMutation({
    mutationFn: findEmailAPI,
    ...options,
  });
};
