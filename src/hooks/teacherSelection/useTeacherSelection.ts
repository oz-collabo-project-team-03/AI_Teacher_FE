import { ApiErrorResponseDto } from '@/types/apiErrorType';
import { GetSelectedTeacherResponse } from '@/types/teacherType';
import axios from 'axios';
import { usePostSelectedTeacherMutation } from '@/api/teacher/teacher.hooks';
import { useToast } from '../useToast';
import { z as zod } from 'zod';

export const teacherNameSchema = zod.object({
  teacher_name: zod.string().min(1, { message: '이름을 입력해주세요' }),
});

export const useTeacherSelection = () => {
  const { showToast } = useToast();

  const {
    mutate: selectTeacherMutation,
    isPending,
    error,
  } = usePostSelectedTeacherMutation({
    onSuccess: (data: GetSelectedTeacherResponse) => {
      showToast(data.message);
    },
    onError: (error) => {
      // Axios 에러인 경우 더 상세한 로깅
      if (axios.isAxiosError(error)) {
     
      }
      const apiError = error as ApiErrorResponseDto;
      const errorMessage =
        apiError?.response?.data?.message ||
        '선생님 지정에 실패하였습니다. 다시 시도해주세요.';
      showToast(errorMessage);
    },
  });

  const handleSelectedTeacher = async (name: string, teacher_id: number) => {
    selectTeacherMutation({ name, teacher_id });
  };

  return {
    selectTeacherMutation: handleSelectedTeacher,
    isPending,
    error,
  };
};
