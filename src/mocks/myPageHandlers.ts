import { http, HttpResponse } from 'msw';
import {
  MyPageResponseDto,
  StudentMyPageResponse,
  TeacherMyPageResponse,
} from '@/types/myPageType';
import postTestImg from '@/assets/editProfile/postTestImg.png';
import img1 from '@/assets/slider/daily1.webp';
import studentDefaultIcon from '@/assets/editProfile/student/studentDefaultIcon.png';
import teacherDefaultIcon from '@/assets/editProfile/teacher/teacherDefaultIcon.png';

type MyPageResponse = {
  success: boolean;
  message: string;
  error?: string;
};

const MOCK_STUDENT_PROFILE: StudentMyPageResponse = {
  role: 'student',
  id: '1',
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
  posts: [
    {
      post_id: 'POST001',
      post_image: img1,
    },
    {
      post_id: 'POST002',
      post_image: img1,
    },
    {
      post_id: 'POST003',
      post_image: img1,
    },
    {
      post_id: 'POST004',
      post_image: img1,
    },
    {
      post_id: 'POST005',
      post_image: img1,
    },
  ],
};

const MOCK_TEACHER_PROFILE: TeacherMyPageResponse = {
  role: 'teacher',
  id: '2',
  nickname: '닉네임',
  profile_image: teacherDefaultIcon,
  organization_name: '소속 이름',
  organization_type: '소속 종류',
  organization_position: '직급',
  post_count: 5,
  like_count: 20,
  comment_count: 45,
  posts: [
    {
      post_id: 'POST101',
      post_image: postTestImg,
    },
    {
      post_id: 'POST102',
      post_image: postTestImg,
    },
  ],
};

const MOCK_PROFILES = [MOCK_STUDENT_PROFILE, MOCK_TEACHER_PROFILE];

export const myPageHandlers = [
  http.get('/users/profile/me', async () => {
    const role = 'student';
    // const role = 'teacher';

    const profile: MyPageResponseDto =
      role === 'student' ? MOCK_STUDENT_PROFILE : MOCK_TEACHER_PROFILE;

    if (!role) {
      return HttpResponse.json<MyPageResponse>(
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
    const profile = MOCK_PROFILES.find((profile) => profile.id === userId);

    if (!profile) {
      return HttpResponse.json<MyPageResponse>(
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
