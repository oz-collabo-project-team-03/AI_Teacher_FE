export type Teacher = {
  teacher_id: number;
  name: string;
  organization_name: string;
  organization_type: string;
  position: string;
};

export type SelectedTeacherRequestParams = {
  teacher_id: number;
  name: string;
};

export type SelectedTeacherResponseDto = {
  message: string;
};
