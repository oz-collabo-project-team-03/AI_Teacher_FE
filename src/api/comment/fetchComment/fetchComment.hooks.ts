import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { CommentListResponseDto } from './fetchCommentType';
import { getFetchCommentAPI } from './fetchCommentAPI';

export const useFetchCommentQuery = (
  post_id: number,
  options?: UseQueryOptions<CommentListResponseDto, Error>
) => {
  return useQuery<CommentListResponseDto, Error>({
    queryKey: ['comments', post_id], // 캐시 키로 사용될 배열, 페이지 파라미터에 따라 댓글을 구분
    queryFn: () => getFetchCommentAPI(post_id), // 실제 API 호출 함수
    ...options,
  });
};
