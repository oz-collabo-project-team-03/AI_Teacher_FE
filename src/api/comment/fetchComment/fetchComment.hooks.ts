import {
  FetchCommentRequestParams,
  FetchCommentResponseDto,
} from './fetchCommentType';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { FetchCommentAPI } from './fetchCommentAPI';

export const useFetchCommentMutation = (
  options?: UseMutationOptions<
    FetchCommentResponseDto, // 성공 시 반환 타입
    Error, // 에러 타입
    { post_id: number; FetchCommentData: FetchCommentRequestParams } // 요청 데이터 타입
  >
) => {
  return useMutation({
    mutationFn: FetchCommentAPI,
    ...options,
  });
};
