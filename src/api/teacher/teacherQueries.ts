import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { teacherAPI } from './teacherAPI';

export const teacherQueries = createQueryKeyStore({
  teachers: {
    all: () => ({
      queryKey: ['teachers'],
      queryFn: () => teacherAPI.getTeachers(),
    }),

    detail: (teacherId: number) => ({
      queryKey: ['teachers', teacherId],
      queryFn: () => teacherAPI.getTeacherDetail(teacherId),
    }),
  },
});
