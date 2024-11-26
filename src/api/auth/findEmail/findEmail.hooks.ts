import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { findEmailAPI } from './findEmailAPI';
import { FindEmailParams, FindEmailResponseDto } from './findEmailType';

export const useFindEmailMutation = (
  options?: UseMutationOptions<
    FindEmailResponseDto, // 성공 시 반환 타입
    Error, // 에러 타입
    FindEmailParams // 요청 데이터 타입
  >
) => {
  return useMutation({
    mutationFn: findEmailAPI,
    ...options,
  });
};
