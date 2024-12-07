import { UseFormRegister, FieldErrors } from 'react-hook-form';

export type EditProfileRequestParams = {
  role?: 'student' | 'teacher';
  nickname?: string;
  profile_image: string;
  // 학생 전용 필드
  career_aspiration?: string;
  interest?: string;
  description?: string;
  // 교사 전용 필드
  organization_name?: string;
  organization_type?: string;
  position?: string;
};

export type ProfileInputFieldsProps = {
  register: UseFormRegister<EditProfileRequestParams>;
  errors: FieldErrors<EditProfileRequestParams>;
};

export type EditProfileResponseDto = {
  message: string;
};
