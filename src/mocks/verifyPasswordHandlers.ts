import { http, HttpResponse } from 'msw';

type VerifyPasswordRequest = {
  password: string;
};

type VerifyPasswordResponse = {
  success: boolean;
  message: string;
  error?: string;
};

const MOCK_USER = {
  id: '1',
  email: 'gw@test.com',
  password: 'qlalfqjsgh1234',
  nickname: '경원학생이지만선생입니다',
  role: 'student',
  school: '서울고등학교',
  grade: 11,
  career_aspiration: '의사',
  interests: '과학',
};

export const verifyPasswordHandler = [
  http.post('/auth/verify/password', async ({ request }) => {
    const data = (await request.json()) as VerifyPasswordRequest;

    // 비밀번호 형식 검증
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(data.password)) {
      return HttpResponse.json<VerifyPasswordResponse>(
        {
          success: false,
          message: '비밀번호는 8자 이상의 영문과 숫자 조합이어야 합니다.',
          error: 'INVALID_PASSWORD_FORMAT',
        },
        { status: 400 }
      );
    }

    if (!data.password) {
      return HttpResponse.json<VerifyPasswordResponse>(
        {
          success: false,
          message: '비밀번호를 입력해주세요.',
          error: 'MISSING_PASSWORD',
        },
        { status: 400 }
      );
    }

    if (data.password === MOCK_USER.password) {
      return HttpResponse.json<VerifyPasswordResponse>(
        {
          success: true,
          message: '비밀번호가 확인되었습니다.',
        },
        { status: 200 }
      );
    }

    return HttpResponse.json<VerifyPasswordResponse>(
      {
        success: false,
        message: '비밀번호가 일치하지 않습니다.',
        error: 'INVALID_PASSWORD',
      },
      { status: 400 }
    );
  }),
];
