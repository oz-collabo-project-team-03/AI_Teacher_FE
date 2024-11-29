import axios from 'axios';
import {
  SelectedTeacherRequestParams,
  SelectedTeacherResponseDto,
  Teacher,
} from '../../types/teacherType';

export const teacherAPI = {
  getTeachers: async () => {
    const response = await axios.get<Teacher[]>('/auth/teachers');
    return response.data;
  },

  getTeacherDetail: async (teacherId: number) => {
    const response = await axios.get<Teacher>(`/api/teachers/${teacherId}`);
    return response.data;
  },
};

export const selectedTeacherAPI = async (
  selectTeacherData: SelectedTeacherRequestParams
): Promise<SelectedTeacherResponseDto> => {
  const response = await axios.post<SelectedTeacherResponseDto>(
    '/auth/study/groups',
    selectTeacherData
  );
  return response.data;
};
