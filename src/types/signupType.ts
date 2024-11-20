export type BaseSignupRequest = {
  email: string;
  password: string;
  password_confirm: string;
  nickname: string;
  phone: string;
  is_privacy_accepted: boolean;
  role: 'student' | 'teacher'; // 리터럴 타입으로 역할 제한
};

// 학생 전용 필드
export type StudentSignupRequest = BaseSignupRequest & {
  role: 'student'; // 리터럴 타입으로 고정
  school: string;
  grade: number;
  career_aspiration: string;
  interests: string;
};

// 선생님 전용 필드
export type TeacherSignupRequest = BaseSignupRequest & {
  role: 'teacher'; // 리터럴 타입으로 고정
  organization_type: string;
  organization_name: string;
  position: string;
};

// 회원가입 요청 타입 (학생 또는 선생님)
export type SignupRequestData = StudentSignupRequest | TeacherSignupRequest;

// 응답 데이터 타입 (성공 시)
export type BaseUserResponse = {
  email: string;
  password: string;
  password_confirm: string;
  nickname: string;
  phone: string;
  is_privacy_accepted: boolean;
  role: 'teacher' | 'student';
};

// 선생님 응답 타입
export type TeacherResponse = BaseUserResponse & {
  role: 'teacher';
  organization_type: string;
  organization_name: string;
  position: string;
};

// 학생 응답 타입
export type StudentResponse = BaseUserResponse & {
  role: 'student';
  school: string;
  grade: number;
  career_aspiration: string;
  interests: string;
};

// 통합 응답 타입 (선생님 또는 학생)
export type SignupResponseData = TeacherResponse | StudentResponse;
