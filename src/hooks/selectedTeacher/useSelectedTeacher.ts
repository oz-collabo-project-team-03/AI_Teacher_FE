import { useSelectedTeacherMutation } from '@/api/teacher/teacher.hooks';
import { ApiErrorResponseDto } from '@/types/apiErrorType';
import { SelectedTeacherResponseDto } from '@/types/teacherType';
import axios from 'axios';
import { z as zod } from 'zod';
import { useToast } from '../useToast';

export const teacherNameSchema = zod.object({
  teacher_name: zod.string().min(1, { message: '이름을 입력해주세요' }),
});

export const useSelectedTeacher = () => {
  const { showToast } = useToast();

  const { mutate: SelectedTeacherMutation } = useSelectedTeacherMutation({
    onSuccess: (data: SelectedTeacherResponseDto) => {
      showToast(data.message);
    },
    onError: (error) => {
      console.error('Login Error:', error); // 에러 상세 로깅

      // Axios 에러인 경우 더 상세한 로깅
      if (axios.isAxiosError(error)) {
        console.error('Axios Error Details:', {
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers,
        });
      }
      const apiError = error as ApiErrorResponseDto;
      const errorMessage =
        apiError?.response?.data?.message ||
        '선생님 지정에 실패하였습니다. 다시 시도해주세요.';
      showToast(errorMessage);
    },
  });

  const handleSelectedTeacher = async (teacher_name: string) => {
    SelectedTeacherMutation({ teacher_name });
  };

  return {
    handleSelectedTeacher,
  };
};
