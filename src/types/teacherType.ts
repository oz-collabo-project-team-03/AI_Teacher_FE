export type Teacher = {
  id: number;
  name: string;
  organization_name: string;
  organization_type: string;
  position: string;
};

export type SelectedTeacherRequestParams = {
  teacher_name: string;
};

export type SelectedTeacherResponseDto = {
  message: string;
};
