import { http, HttpResponse } from 'msw';

type SignupRequest = {
  email: string;
  password: string;
  password_confirm: string;
  nickname: string;
  phone: string;
  is_privacy_accepted: boolean;
  role: string;
  school: string;
  grade: number;
  career_aspiration: string;
  interests: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

const MOCK_USER = {
  id: '1',
  email: 'student@example.com',
  password: 'password123', // 실제로는 절대 평문으로 저장하면 안 됨
  nickname: 'StudentNick',
  role: 'student',
  school: '서울고등학교',
  grade: 11,
  career_aspiration: '의사',
  interests: '과학',
};

export const handlers = [
  // 회원가입
  http.post('/api/signup', async ({ request }) => {
    const data = (await request.json()) as SignupRequest;

    // 기본적인 타입 체크
    const requiredFields: (keyof SignupRequest)[] = [
      'email',
      'password',
      'password_confirm',
      'nickname',
      'phone',
      'is_privacy_accepted',
      'role',
      'school',
      'grade',
      'career_aspiration',
      'interests',
    ];

    const missingFields = requiredFields.filter((field) => !(field in data));

    if (missingFields.length > 0) {
      return HttpResponse.json(
        {
          success: false,
          message: '필수 필드가 누락되었습니다.',
          missing: missingFields,
        },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        success: true,
        message: '회원가입이 완료되었습니다.',
        user: {
          id: crypto.randomUUID(),
          ...data,
        },
      },
      { status: 201 }
    );
  }),

  // 로그인
  http.post('/api/login', async ({ request }) => {
    const data = (await request.json()) as LoginRequest;

    // 이메일과 비밀번호 확인
    if (
      data.email !== MOCK_USER.email ||
      data.password !== MOCK_USER.password
    ) {
      return HttpResponse.json(
        {
          success: false,
          message: '이메일 또는 비밀번호가 일치하지 않습니다.',
        },
        { status: 401 }
      );
    }

    // 로그인 성공 시 토큰과 함께 유저 정보 반환
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = MOCK_USER;

    return HttpResponse.json(
      {
        success: true,
        message: '로그인이 완료되었습니다.',
        token: 'mock_jwt_token_' + Date.now(), // 실제로는 JWT 토큰 생성 필요
        user: userWithoutPassword,
      },
      {
        status: 200,
        headers: {
          'Set-Cookie':
            'auth=mock_jwt_token; Path=/; HttpOnly; Secure; SameSite=Strict',
        },
      }
    );
  }),

  // (선택사항) 로그인 체크용 API
  http.get('/api/me', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json(
        {
          success: false,
          message: '인증이 필요합니다.',
        },
        { status: 401 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = MOCK_USER;

    return HttpResponse.json({
      success: true,
      user: userWithoutPassword,
    });
  }),
];
