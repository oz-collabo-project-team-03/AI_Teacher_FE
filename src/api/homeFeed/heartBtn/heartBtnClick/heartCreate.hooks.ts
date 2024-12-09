import {
  HeartCreateRequestParams,
  HeartCreateResponseDto,
} from './heartCreateType';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { ApiError } from '@/types/apiErrorType';
import { HeartCreateAPI } from './heartCreateAPI';

export const useHeartCreateMutation = (
  options?: UseMutationOptions<
    HeartCreateResponseDto, // 성공 시 반환 타입
    ApiError, // 에러 타입
    HeartCreateRequestParams // 요청 데이터 타입
  >
) => {
  return useMutation({
    mutationFn: HeartCreateAPI,
    ...options,
  });
};
