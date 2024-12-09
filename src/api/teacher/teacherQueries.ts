import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { teacherAPI } from './teacherAPI';

export const teacherQueries = createQueryKeyStore({
  teachers: {
    all: (role?: string) => ({
      queryKey: ['teachers'],
      queryFn: () => {
        if (role === 'student') {
          return teacherAPI.getTeachers();
        }

        return Promise.resolve([]);
      },
      enabled: role === 'student',
    }),

    //안쓸듯
    // detail: (teacherId: number) => ({
    //   queryKey: ['teachers', teacherId],
    //   queryFn: () => teacherAPI.getTeacherDetail(teacherId),
    // }),
  },
});
