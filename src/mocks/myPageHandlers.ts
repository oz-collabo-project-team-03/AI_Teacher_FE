import { http, HttpResponse } from 'msw';
import {
  MyPageResponseData,
  StudentMyPageResponse,
  TeacherMyPageResponse,
} from '@/types/myPageType';
import postTestImg from '@/assets/editProfile/postTestImg.png';
import img1 from '@/assets/slider/daily1.webp';
import studentDefaultIcon from '@/assets/editProfile/student/studentDefaultIcon.png';
import teacherDefaultIcon from '@/assets/editProfile/teacher/teacherDefaultIcon.png';

const MOCK_STUDENT_PROFILE: StudentMyPageResponse = {
  role: 'student',
  id: 'dlguswn',
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
  id: 'ID101',
  nickname: '닉네임',
  profile_image: teacherDefaultIcon, // 임시 이미지
  organization_name: '소속 이름',
  organization_type: '소속 종류',
  organization_position: '직급',
  post_count: 5,
  like_count: 20,
  comment_count: 45,
  posts: [
    {
      post_id: 'POST101',
      post_image: postTestImg, // 임시 이미지
    },
    {
      post_id: 'POST102',
      post_image: postTestImg, // 임시 이미지
    },
  ],
};

export const myPageHandlers = [
  http.get('/users/profile/me', async () => {
    const role = 'student';
    // const role = 'teacher';

    const profile: MyPageResponseData =
      role === 'student' ? MOCK_STUDENT_PROFILE : MOCK_TEACHER_PROFILE;

    return HttpResponse.json(profile, { status: 200 });
  }),

  // 다른 사용자 프로필
  http.get('/users/profile/:userId', async ({ params }) => {
    const { userId } = params;
    const profile: MyPageResponseData = {
      ...MOCK_STUDENT_PROFILE,
      id: userId as string,
    };

    return HttpResponse.json(profile, { status: 200 });
  }),
];
