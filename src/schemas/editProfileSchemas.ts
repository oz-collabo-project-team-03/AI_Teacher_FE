import { z as zod } from 'zod';

export const profileFormSchema = zod.discriminatedUnion('role', [
  zod.object({
    role: zod.literal('student'),
    nickname: zod
      .string()
      .min(2, { message: '닉네임은 최소 2글자 이상이어야 합니다.' }),
    description: zod
      .string()
      .min(1, { message: '상태 메세지는 필수 입력값입니다.' }),
    career_aspiration: zod
      .string()
      .min(1, { message: '희망 진로는 필수 입력값입니다.' }),
    interest: zod.string().min(1, { message: '흥미는 필수 입력값입니다.' }),
  }),
  zod.object({
    role: zod.literal('teacher'),
    nickname: zod.string().min(1, { message: '이름은 필수 입력값입니다.' }),
    organization_name: zod
      .string()
      .min(1, { message: '소속 종류는 필수 입력값입니다.' }),
    organization_type: zod
      .string()
      .min(1, { message: '소속 이름은 필수 입력값입니다.' }),
    organization_position: zod
      .string()
      .min(1, { message: '직급는 필수 입력값입니다.' }),
  }),
]);
