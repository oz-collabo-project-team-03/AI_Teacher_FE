import axios from 'axios';
import {
  SelectedTeacherRequestParams,
  SelectedTeacherResponseDto,
  Teacher,
} from '../../types/teacherType';
import axiosInstance from '../axiosInstance';

export const teacherAPI = {
  getTeachers: async () => {
    const response = await axiosInstance.get<Teacher[]>('/auth/teachers');
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
  const response = await axiosInstance.post<SelectedTeacherResponseDto>(
    '/auth/study/groups',
    selectTeacherData
  );
  return response.data;
};
