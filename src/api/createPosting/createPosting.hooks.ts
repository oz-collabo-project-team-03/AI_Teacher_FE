import {
  CreatePostingRequestParams,
  CreatePostingResponseDto,
} from '../../types/createPostingType';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { CreatePostingAPI } from './createPostingAPI';

export const useCreatePostingMutation = (
  options?: UseMutationOptions<
    CreatePostingResponseDto, // 성공 시 반환 타입
    Error, // 에러 타입
    CreatePostingRequestParams // 요청 데이터 타입
  >
) => {
  return useMutation({
    mutationFn: CreatePostingAPI,
    ...options,
  });
};
