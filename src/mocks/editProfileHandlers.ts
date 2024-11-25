import { http, HttpResponse } from 'msw';
import { EditProfileRequestData } from '@/types/editProfile';

export const editProfileHandlers = [
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
