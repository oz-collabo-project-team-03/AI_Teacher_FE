import {
  GetSelectedTeacherResponse,
  SelectedTeacherRequestParams,
} from '@/types/teacherType';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { teacherAPI } from './teacherAPI';

export const usePostSelectedTeacherMutation = (
  options?: UseMutationOptions<
    GetSelectedTeacherResponse, // 성공 시 반환 타입
    Error, // 에러 타입
    SelectedTeacherRequestParams // 요청 데이터 타입
  >
) => {
  return useMutation({
    mutationFn: teacherAPI.postSelectedTeacher,
    ...options,
  });
};
