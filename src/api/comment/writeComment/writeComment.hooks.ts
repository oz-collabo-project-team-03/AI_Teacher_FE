import {
  FetchCommentRequestParams,
  FetchCommentResponseDto,
} from './writeCommentType';
import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from '@tanstack/react-query';

import { FetchCommentAPI } from './writeCommentAPI';

export const useFetchCommentMutation = (
  options?: UseMutationOptions<
    FetchCommentResponseDto,
    Error,
    { post_id: string; FetchCommentData: FetchCommentRequestParams },
    unknown // 아직 상태나 다른 반환값에 대한 타입이 없으므로 unknown으로 설정
  >
): UseMutationResult<
  FetchCommentResponseDto,
  Error,
  { post_id: string; FetchCommentData: FetchCommentRequestParams },
  unknown
> => {
  return useMutation({
    mutationFn: FetchCommentAPI,
    ...options,
  });
};
