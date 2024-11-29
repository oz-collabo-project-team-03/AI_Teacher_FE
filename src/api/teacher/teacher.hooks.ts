import {
  SelectedTeacherRequestParams,
  SelectedTeacherResponseDto,
} from '@/types/teacherType';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { selectedTeacherAPI } from './teacherAPI';

export const useSelectedTeacherMutation = (
  options?: UseMutationOptions<
    SelectedTeacherResponseDto, // 성공 시 반환 타입
    Error, // 에러 타입
    SelectedTeacherRequestParams // 요청 데이터 타입
  >
) => {
  return useMutation({
    mutationFn: selectedTeacherAPI,
    ...options,
    throwOnError: true,
  });
};
