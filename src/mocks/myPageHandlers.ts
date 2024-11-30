import { http, HttpResponse } from 'msw';
import {
  StudentMyPageResponse,
  TeacherMyPageResponse,
} from '@/types/myPageType';
import postTestImg from '@/assets/editProfile/postTestImg.png';
import img1 from '@/assets/slider/daily1.webp';
import studentDefaultIcon from '@/assets/editProfile/student/studentDefaultIcon.png';
import teacherDefaultIcon from '@/assets/editProfile/teacher/teacherDefaultIcon.png';

type ApiResponse = {
  success: boolean;
  message: string;
  error?: string;
};

const MOCK_STUDENT_PROFILE: StudentMyPageResponse[] = [
  {
    role: 'student',
    id: 'guswnvld',
    nickname: '현주핑',
    profile_image: studentDefaultIcon,
    school: '학교',
    grade: '학년',
    career_aspiration: '프로게이머',
    interest: '게임',
    description: '롤 할사람 친추 ㄱㄱ',
    post_count: 15,
    like_count: 10,
    comment_count: 18,
    posts: Array(3)
      .fill(null)
      .map((_, i) => ({
        post_id: `POST${i + 1}`,
        post_image: img1,
      })),
  },
  {
    role: 'student',
    id: 'ruddnjsvld',
    nickname: '경원핑',
    profile_image: studentDefaultIcon,
    school: '학교',
    grade: '학년',
    career_aspiration: '로또 당첨',
    interest: '알바',
    description: '로또 1등 당첨되고 싶어요',
    post_count: 8,
    like_count: 25,
    comment_count: 12,
    posts: Array(3)
      .fill(null)
      .map((_, i) => ({
        post_id: `POST${i + 1}`,
        post_image: img1,
      })),
  },
];

const MOCK_TEACHER_PROFILE: TeacherMyPageResponse[] = [
  {
    role: 'teacher',
    id: 'rlaqhfk',
    nickname: '김보라',
    profile_image: teacherDefaultIcon,
    organization_name: 'B 학원',
    organization_type: '사립',
    organization_position: '원장',
    post_count: 5,
    like_count: 20,
    comment_count: 45,
    posts: Array(2)
      .fill(null)
      .map((_, i) => ({
        post_id: `POST${i + 1}`,
        post_image: postTestImg,
      })),
  },
  {
    role: 'teacher',
    id: 'dltlgur',
    nickname: '이시혁',
    profile_image: teacherDefaultIcon,
    organization_name: 'B 학원',
    organization_type: '사립',
    organization_position: '강사',
    post_count: 12,
    like_count: 30,
    comment_count: 25,
    posts: Array(2)
      .fill(null)
      .map((_, i) => ({
        post_id: `POST${i + 1}`,
        post_image: postTestImg,
      })),
  },
];

const ALL_MOCK_PROFILES = [...MOCK_STUDENT_PROFILE, ...MOCK_TEACHER_PROFILE];

export const myPageHandlers = [
  http.get('/users/profile/me', async () => {
    const role = 'student';
    // const role = 'teacher';

    const profile =
      role === 'student' ? MOCK_STUDENT_PROFILE[0] : MOCK_TEACHER_PROFILE;

    if (!role) {
      return HttpResponse.json<ApiResponse>(
        {
          success: false,
          message: '로그인 정보가 없습니다.',
          error: 'USER_NOT_FOUND',
        },
        { status: 404 }
      );
    }

    return HttpResponse.json(profile, { status: 200 });
  }),

  // 다른 사용자 프로필
  http.get('/users/profile/:userId', async ({ params }) => {
    const { userId } = params;

    // userId로 프로필 찾기
    const profile = ALL_MOCK_PROFILES.find((profile) => profile.id === userId);

    if (!profile) {
      return HttpResponse.json<ApiResponse>(
        {
          success: false,
          message: '사용자를 찾을 수 없습니다.',
          error: 'USER_NOT_FOUND',
        },
        { status: 404 }
      );
    }

    return HttpResponse.json(profile, { status: 200 });
  }),
];
