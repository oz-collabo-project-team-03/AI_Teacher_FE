const POSITIONS = {
  STUDENT: 'student',
  TEACHER: 'teacher',
} as const;

export type TeacherDto = {
  teacher_id: number;
  name: string;
  organization_name: string;
  organization_type: string;
  position: keyof typeof POSITIONS;
};

export type SelectedTeacherRequestParams = {
  teacher_id: number;
  name: string;
};

export type GetSelectedTeacherResponse = {
  message: string;
};
