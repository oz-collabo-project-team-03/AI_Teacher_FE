import { http, HttpResponse } from 'msw';
import { EditProfileRequestParams } from '@/types/editProfileType';

type ApiResponse = {
  success: boolean;
  message: string;
  error?: string;
};

export const editProfileHandlers = [
  http.patch('/users/profile/student', async ({ request }) => {
    const data = await request.json();

    if (!data || typeof data !== 'object') {
      return HttpResponse.json<ApiResponse>(
        {
          success: false,
          message: '유효하지 않은 요청 데이터입니다.',
          error: 'INVALID_DATA',
        },
        { status: 400 }
      );
    }

    // 학생 데이터 검증 및 업데이트
    const requiredFields: (keyof EditProfileRequestParams)[] = [
      'nickname',
      'profile_image',
      'career_aspiration',
      'interest',
      'description',
    ];

    const missingFields = requiredFields.filter((field) => !data[field]);
    if (missingFields.length > 0) {
      return HttpResponse.json<ApiResponse>(
        {
          success: false,
          message: `필수 정보가 누락되었습니다: ${missingFields.join(', ')}`,
          error: 'MISSING_FIELDS',
        },
        { status: 400 }
      );
    }

    // 성공적인 업데이트 응답 (모의 DB 업데이트 로직 추가 가능)
    return HttpResponse.json(data, { status: 200 });
  }),

  http.patch('/users/profile/teacher', async ({ request }) => {
    const data = await request.json();

    if (!data || typeof data !== 'object') {
      return HttpResponse.json<ApiResponse>(
        {
          success: false,
          message: '유효하지 않은 요청 데이터입니다.',
          error: 'INVALID_DATA',
        },
        { status: 400 }
      );
    }

    // 선생 데이터 검증 및 업데이트
    const requiredFields: (keyof EditProfileRequestParams)[] = [
      'nickname',
      'profile_image',
      'organization_name',
      'organization_type',
      'organization_position',
    ];

    const missingFields = requiredFields.filter((field) => !data[field]);
    if (missingFields.length > 0) {
      return HttpResponse.json<ApiResponse>(
        {
          success: false,
          message: `필수 정보가 누락되었습니다: ${missingFields.join(', ')}`,
          error: 'MISSING_FIELDS',
        },
        { status: 400 }
      );
    }

    // 성공적인 업데이트 응답 (모의 DB 업데이트 로직 추가 가능)
    return HttpResponse.json(data, { status: 200 });
  }),
];
