import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { StudentsListResponseDto } from './studentsListType';
import { getStudentsListAPI } from './studentsListAPI';

export const useFetchStudentsListQuery = (
  options?: UseQueryOptions<StudentsListResponseDto, Error>
) => {
  return useQuery<StudentsListResponseDto, Error>({
    queryKey: ['studentsList'],
    queryFn: getStudentsListAPI,
    ...options,
  });
};
