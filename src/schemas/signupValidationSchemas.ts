import { z as zod } from 'zod';

/** 회원가입 폼 스키마 정의 (학생 및 선생님 스키마로 확장)*/
export const baseSignupSchema = zod.object({
  //이메일 형식 지정
  email: zod.string().email({ message: '올바른 이메일 형식이 아닙니다.' }),
  code: zod.string().min(1, { message: '인증코드를 입력해주세요.' }),
  password: zod
    .string()
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{10,20}$/,
      '문자, 특수문자, 숫자가 혼합된 10~20자리의 비밀번호를 입력해주세요.'
    )
    .min(10, { message: '비밀번호는 10자 이상이어야 합니다.' })
    .max(20, { message: '비밀번호는 20자 이하여야 합니다.' }),
  confirmPassword: zod.string(),
  phone: zod
    .string()
    .regex(/^0\d{9,10}$/, '전화번호 형식이 유효하지 않습니다.'),
});

export const studentSignupSchema = baseSignupSchema.extend({
  nickname: zod
    .string()
    .min(1, { message: '닉네임은 필수 입력값입니다. 20자 이내' })
    .max(20),
  school: zod.string().min(1, { message: '학교명을 입력해주세요.' }),
  grade: zod.number().min(1, { message: '학년은 1 이상이어야 합니다.' }),
  careeraspiration: zod
    .string()
    .min(1, { message: '희망진로를 입력해주세요.' }),
  interestrade: zod.string().min(1, { message: '흥미를 입력해주세요.' }),
});

export const teacherSignupSchema = baseSignupSchema.extend({
  name: zod.string().min(1, { message: '이름은 필수 입력값입니다.' }).max(10),
  organization_type: zod
    .string()
    .min(1, { message: '소속종류를 입력해주세요.' }),
  organization_name: zod
    .string()
    .min(1, { message: '소속이름을 입력해주세요.' }),
  position: zod.string().min(1, { message: '직급을 입력해주세요.' }),
});

/** 학생/선생님 공통으로 사용할 스키마 정의*/
export const signupFormSchema = zod
  .union([studentSignupSchema, teacherSignupSchema])
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  });
