import { StudentsListResponseDto } from './studentsListType';
import axiosInstance from '../axiosInstance';

export const getStudentsListAPI =
  async (): Promise<StudentsListResponseDto> => {
    const response =
      await axiosInstance.get<StudentsListResponseDto>(`/teacher/students`);
    console.log(response.data);
    return response.data;
  };
