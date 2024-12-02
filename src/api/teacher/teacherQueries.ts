import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { teacherAPI } from './teacherAPI';

export const teacherQueries = createQueryKeyStore({
  teachers: {
    all: () => ({
      queryKey: ['teachers'],
      queryFn: () => teacherAPI.getTeachers(),
    }),

    //안쓸듯
    // detail: (teacherId: number) => ({
    //   queryKey: ['teachers', teacherId],
    //   queryFn: () => teacherAPI.getTeacherDetail(teacherId),
    // }),
  },
});
