import { http, HttpResponse } from 'msw';
import {
  BaseSignupRequest,
  SignupRequestData,
  StudentSignupRequest,
  TeacherSignupRequest,
} from '../types/signupType';

type LoginRequest = {
  email: string;
  password: string;
};

type SendVerificationRequest = {
  email: string;
};

type VerifyCodeRequest = {
  email: string;
  code: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
  error?: string;
  code?: string;
  verified?: boolean;
};

// 이미 가입된 이메일 목록 (실제로는 DB에서 확인)
const registeredEmails = ['test@example.com', 'user@example.com'];

const MOCK_USER = {
  id: '1',
  email: 'student@example.com',
  password: 'password123',
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
    const data = (await request.json()) as SignupRequestData;

    // 공통 필수 필드 체크
    const baseRequiredFields: (keyof BaseSignupRequest)[] = [
      'email',
      'password',
      'password_confirm',
      'nickname',
      'phone',
      'is_privacy_accepted',
      'role',
    ];

    // 공통 필드 검증
    const missingBaseFields = baseRequiredFields.filter(
      (field) => !data[field]
    );
    if (missingBaseFields.length > 0) {
      return HttpResponse.json<ApiResponse>(
        {
          success: false,
          message: `필수 정보가 누락되었습니다: ${missingBaseFields.join(', ')}`,
          error: 'MISSING_REQUIRED_FIELDS',
        },
        { status: 400 }
      );
    }

    // role별 필수 필드 체크
    if (data.role === 'student') {
      const studentRequiredFields: (keyof Omit<
        StudentSignupRequest,
        keyof BaseSignupRequest
      >)[] = ['school', 'grade', 'career_aspiration', 'interests'];

      const missingStudentFields = studentRequiredFields.filter(
        (field) => !(data as StudentSignupRequest)[field]
      );

      if (missingStudentFields.length > 0) {
        return HttpResponse.json<ApiResponse>(
          {
            success: false,
            message: `학생 필수 정보가 누락되었습니다: ${missingStudentFields.join(', ')}`,
            error: 'MISSING_STUDENT_FIELDS',
          },
          { status: 400 }
        );
      }
    } else {
      const teacherRequiredFields: (keyof Omit<
        TeacherSignupRequest,
        keyof BaseSignupRequest
      >)[] = ['organization_type', 'organization_name', 'position'];

      const missingTeacherFields = teacherRequiredFields.filter(
        (field) => !(data as TeacherSignupRequest)[field]
      );

      if (missingTeacherFields.length > 0) {
        return HttpResponse.json<ApiResponse>(
          {
            success: false,
            message: `교사 필수 정보가 누락되었습니다: ${missingTeacherFields.join(', ')}`,
            error: 'MISSING_TEACHER_FIELDS',
          },
          { status: 400 }
        );
      }
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return HttpResponse.json<ApiResponse>(
        {
          success: false,
          message: '유효하지 않은 이메일 형식입니다.',
          error: 'INVALID_EMAIL_FORMAT',
        },
        { status: 400 }
      );
    }

    // 비밀번호 일치 검증
    if (data.password !== data.password_confirm) {
      return HttpResponse.json<ApiResponse>(
        {
          success: false,
          message: '비밀번호가 일치하지 않습니다.',
          error: 'PASSWORD_MISMATCH',
        },
        { status: 400 }
      );
    }

    // 전화번호 형식 검증
    const phoneRegex = /^01[0-9]{8,9}$/;
    if (!phoneRegex.test(data.phone)) {
      return HttpResponse.json<ApiResponse>(
        {
          success: false,
          message: '유효하지 않은 전화번호 형식입니다.',
          error: 'INVALID_PHONE_FORMAT',
        },
        { status: 400 }
      );
    }

    // 회원가입 성공
    return HttpResponse.json<ApiResponse>(
      {
        success: true,
        message: '회원가입이 완료되었습니다.',
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
  // 인증 코드 발송 API
  http.post('/api/email/send-verification', async ({ request }) => {
    const { email } = (await request.json()) as SendVerificationRequest;

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return HttpResponse.json(
        {
          success: false,
          message: '유효하지 않은 이메일 형식입니다.',
        },
        { status: 400 }
      );
    }

    // 실제로는 DB에 저장되어야 하는 인증 코드
    const verificationCode = Math.random().toString().slice(2, 8);

    return HttpResponse.json({
      success: true,
      message: '인증 코드가 발송되었습니다.',
      code: verificationCode, // 실제 구현에서는 이 코드를 응답에 포함하지 않음
    });
  }),
  http.post('/api/email/verify-code', async ({ request }) => {
    const { email, code } = (await request.json()) as VerifyCodeRequest;

    // 이메일 중복 재확인 (인증 과정 중 다른 사용자가 가입했을 수 있음)
    if (registeredEmails.includes(email)) {
      return HttpResponse.json<ApiResponse>(
        {
          success: false,
          message: '이미 가입된 이메일 주소입니다.',
          error: 'EMAIL_ALREADY_EXISTS',
          verified: false,
        },
        { status: 409 }
      );
    }

    // 실제로는 DB에서 저장된 코드와 비교해야 함
    if (code === '123456') {
      return HttpResponse.json({
        success: true,
        message: '이메일 인증이 완료되었습니다.',
        verified: true,
      });
    }

    return HttpResponse.json(
      {
        success: false,
        message: '잘못된 인증 코드입니다.',
        verified: false,
      },
      { status: 400 }
    );
  }),
];
