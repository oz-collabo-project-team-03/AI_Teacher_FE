import axios from 'axios';
import {
  GetSelectedTeacherResponse,
  SelectedTeacherRequestParams,
  TeacherDto,
} from '../../types/teacherType';
import axiosInstance from '../axiosInstance';

export const teacherAPI = {
  getTeachers: async () => {
    const response = await axiosInstance.get<TeacherDto[]>('/auth/teachers');
    return response.data;
  },

  getTeacherDetail: async (teacherId: number) => {
    const response = await axios.get<TeacherDto>(`/api/teachers/${teacherId}`);
    return response.data;
  },
  postSelectedTeacher: async (
    selectTeacherData: SelectedTeacherRequestParams
  ): Promise<GetSelectedTeacherResponse> => {
    const response = await axiosInstance.post<GetSelectedTeacherResponse>(
      '/auth/study/groups',
      selectTeacherData
    );
    return response.data;
  },
};
