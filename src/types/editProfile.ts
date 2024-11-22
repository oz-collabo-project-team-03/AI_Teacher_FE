import { UseFormRegister, FieldErrors } from 'react-hook-form';

export type EditProfileRequestData = {
  role: 'student' | 'teacher';
  nickname: string;
  profile_image: string;
  // 학생 전용 필드
  career_aspiration?: string;
  interest?: string;
  description?: string;
  // 교사 전용 필드
  organization_name?: string;
  organization_type?: string;
  organization_position?: string;
};

export type ProfileInputFieldsProps = {
  register: UseFormRegister<EditProfileRequestData>;
  errors: FieldErrors<EditProfileRequestData>;
};
