import { z as zod } from 'zod';

// 기본 회원정보 변경 스키마
export const baseEditSchema = zod.object({
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

// 학생용 회원정보 변경 스키마
export const studentEditSchema = baseEditSchema.extend({
  school: zod.string().min(1, { message: '학교명를 입력해주세요.' }),
  grade: zod.number().min(1, { message: '학년은 1 이상이어야 합니다.' }),
});

// 역할에 따른 스키마 선택 함수
export const getEditSchemaByRole = (role: string) => {
  const schema = role === 'student' ? studentEditSchema : baseEditSchema;
  return schema.refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });
};
