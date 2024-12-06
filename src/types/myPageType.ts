// 공통된 마이페이지 응답 타입
export type BaseMyPageResponse = {
  role: 'student' | 'teacher';
  id: number;
  nickname: string;
  profile_image: string;
  post_count: number;
  like_count: number;
  comment_count: number;
  posts: Post[];
};

// 공통된 포스트 타입
export type Post = {
  post_id: string;
  post_image: string;
};

// 학생 프로필 타입
export type StudentMyPageResponse = BaseMyPageResponse & {
  role: 'student';
  school: string;
  grade: string;
  career_aspiration: string;
  interest: string;
  description: string;
};

// 선생님 프로필 타입
export type TeacherMyPageResponse = BaseMyPageResponse & {
  role: 'teacher';
  organization_name: string;
  organization_type: string;
  organization_position: string;
};

// 통합 마이페이지 응답 타입
export type MyPageResponseDto = StudentMyPageResponse | TeacherMyPageResponse;
