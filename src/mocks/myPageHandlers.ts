import { http, HttpResponse } from 'msw';
import {
  MyPageResponseData,
  StudentMyPageResponse,
  TeacherMyPageResponse,
} from '@/types/myPageType';
import { EditProfileRequestData } from '@/types/editProfile';
import postTestImg from '@/assets/editProfile/postTestImg.png';
import studentDefaultIcon from '@/assets/editProfile/student/studentDefaultIcon.png';
import teacherDefaultIcon from '@/assets/editProfile/teacher/teacherDefaultIcon.png';

const MOCK_STUDENT_PROFILE: StudentMyPageResponse = {
  role: 'student',
  id: 'ID001',
  nickname: '닉네임',
  profile_image: studentDefaultIcon, // 임시 이미지
  school: '학교',
  grade: '학년',
  career_aspiration: '희망 진로',
  interest: '흥미',
  description: '상태 메세지',
  post_count: 2,
  like_count: 10,
  comment_count: 18,
  posts: [
    {
      post_id: 'POST001',
      post_image: postTestImg, // 임시 이미지
    },
    {
      post_id: 'POST002',
      post_image: postTestImg, // 임시 이미지
    },
    {
      post_id: 'POST003',
      post_image: postTestImg, // 임시 이미지
    },
    {
      post_id: 'POST004',
      post_image: postTestImg, // 임시 이미지
    },
    {
      post_id: 'POST005',
      post_image: postTestImg, // 임시 이미지
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
  http.get('/api/profile/me', async () => {
    const role = 'student';
    // const role = 'teacher';

    const profile: MyPageResponseData =
      role === 'student' ? MOCK_STUDENT_PROFILE : MOCK_TEACHER_PROFILE;

    return HttpResponse.json(
      {
        success: true,
        message: '마이페이지 데이터가 성공적으로 반환되었습니다.',
        data: profile,
      },
      { status: 200 }
    );
  }),

  // 다른 사용자 프로필
  http.get('/api/profile/:userId', async ({ params }) => {
    const { userId } = params;
    const profile: MyPageResponseData = {
      ...MOCK_STUDENT_PROFILE,
      id: userId as string,
    };

    return HttpResponse.json(
      {
        success: true,
        message: '사용자 프로필 데이터가 성공적으로 반환되었습니다.',
        data: profile,
      },
      { status: 200 }
    );
  }),

  http.patch('/api/profile/me', async ({ request }) => {
    const data = await request.json();

    if (!data || typeof data !== 'object') {
      return HttpResponse.json(
        {
          success: false,
          message: '유효하지 않은 요청 데이터입니다.',
          error: 'INVALID_DATA',
        },
        { status: 400 }
      );
    }

    if (!('role' in data)) {
      return HttpResponse.json(
        {
          success: false,
          message: 'role 필드가 누락되었습니다.',
          error: 'MISSING_ROLE',
        },
        { status: 400 }
      );
    }

    // 학생 데이터 검증 및 업데이트
    if (data.role === 'student') {
      const requiredFields: (keyof EditProfileRequestData)[] = [
        'nickname',
        'profile_image',
        'career_aspiration',
        'interest',
        'description',
      ];

      const missingFields = requiredFields.filter((field) => !data[field]);
      if (missingFields.length > 0) {
        return HttpResponse.json(
          {
            success: false,
            message: `필수 정보가 누락되었습니다: ${missingFields.join(', ')}`,
            error: 'MISSING_FIELDS',
          },
          { status: 400 }
        );
      }

      // 성공적인 업데이트 응답 (모의 DB 업데이트 로직 추가 가능)
      return HttpResponse.json(
        {
          success: true,
          message: '학생 프로필이 성공적으로 업데이트되었습니다.',
          data,
        },
        { status: 200 }
      );
    }

    // 선생 데이터 검증 및 업데이트
    if (data.role === 'teacher') {
      const requiredFields: (keyof EditProfileRequestData)[] = [
        'nickname',
        'profile_image',
        'organization_name',
        'organization_type',
        'organization_position',
      ];

      const missingFields = requiredFields.filter((field) => !data[field]);
      if (missingFields.length > 0) {
        return HttpResponse.json(
          {
            success: false,
            message: `필수 정보가 누락되었습니다: ${missingFields.join(', ')}`,
            error: 'MISSING_FIELDS',
          },
          { status: 400 }
        );
      }

      // 성공적인 업데이트 응답
      return HttpResponse.json(
        {
          success: true,
          message: '선생 프로필이 성공적으로 업데이트되었습니다.',
          data,
        },
        { status: 200 }
      );
    }

    // 지원되지 않는 역할 처리
    return HttpResponse.json(
      {
        success: false,
        message: '지원되지 않는 역할(role)입니다.',
        error: 'INVALID_ROLE',
      },
      { status: 400 }
    );
  }),
];
