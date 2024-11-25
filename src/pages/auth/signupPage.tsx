import {
  useEmailVerificationCodeMutation,
  useEmailVerificationMutation,
} from '@/api/auth/sendEmail/sendEmail.hooks';
import { useSignupMutation } from '@/api/auth/signup/signup.hooks';
import AuthInput from '@/components/auth/AuthInput';
import { GradeSelector } from '@/components/auth/GradeButton';
import Button from '@/components/common/Button';
import useCountdown from '@/hooks/signup/useCountDown';
import { useToast } from '@/hooks/useToast';
import { signupFormSchema } from '@/schemas/signupValidationSchemas';
import { useTermsStore } from '@/stores/useTermsStore';
import { ApiErrorResponseDto } from '@/types/apiErrorType';
import { SignupRequestParams } from '@/types/signupType';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

const STEP = {
  ACCOUNT_INFO: 1,
  PERSONAL_INFO: 2,
};

const SignupPage = () => {
  const [role, setRole] = useState<'student' | 'teacher' | null>(null);
  const [step, setStep] = useState(STEP.ACCOUNT_INFO);
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(1);

  const { role: roleParam } = useParams<{ role: 'student' | 'teacher' }>();
  const navigate = useNavigate();

  const { isAllTermsAccepted } = useTermsStore();
  const { start, formatTime, reset } = useCountdown(300); // 300초 카운트다운
  const { showToast } = useToast();

  // useForm 훅으로 폼 상태 관리
  const form = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: '',
      code: '',
      password: '',
      confirmPassword: '',
      nickname: '',
      phone: '',
      school: '',
      grade: selectedGrade, // 학년
      careeraspiration: '', //희망진로
      organization_type: '', // 소속종류
      organization_name: '', // 소속이름
      position: '', // 직급
      interestrade: '', // 흥미
    },
    mode: 'onChange',
  });

  const {
    register,
    formState: { errors },
    getValues,
  } = form;

  /** 회원가입 처리 */
  const { mutate: SignupMutation } = useSignupMutation({
    onSuccess: (data) => {
      console.log('회원가입 완료', data);
    },
    onError(error) {
      console.error('회원가입 실패', error.message);
    },
  });

  const handleSignup = async () => {
    const formData = getValues();

    const signupData: SignupRequestParams = {
      email: formData.email,
      password: formData.password,
      password_confirm: formData.confirmPassword,
      nickname: formData.nickname,
      phone: formData.phone,
      is_privacy_accepted: isAllTermsAccepted,
      role: roleParam,

      // 학생 전용 필드
      ...(roleParam === 'student' && {
        school: formData.school,
        grade: selectedGrade,
        career_aspiration: formData.careeraspiration,
        interests: formData.interestrade,
      }),

      // 선생님 전용 필드
      ...(roleParam === 'teacher' && {
        organization_type: formData.organization_type,
        organization_name: formData.organization_name,
        position: formData.position,
      }),
    } as SignupRequestParams;

    // 첫 번째 단계: 이메일, 비밀번호 검증
    if (step === STEP.ACCOUNT_INFO) {
      // 이메일, 비밀번호, 비밀번호 확인 에러 체크
      if (errors.email || errors.password || errors.confirmPassword) {
        return;
      }

      // 인증코드 존재 여부 확인
      const code = getValues('code');
      if (!code) {
        showToast('인증번호를 입력해주세요');
        return;
      }
      setStep(STEP.PERSONAL_INFO); //'계정 정보'에서 '개인 정보'로 단계 전환
    } else if (step === STEP.PERSONAL_INFO) {
      // PERSONAL_INFO 단계에서 유효성 검증
      if (roleParam === 'student') {
        // 학생 전용 유효성 검증
        if (
          !formData.nickname ||
          !formData.phone ||
          !formData.school ||
          !formData.careeraspiration ||
          !formData.interestrade
        ) {
          showToast('모든 필드를 입력해주세요.');
          return;
        }
      } else if (roleParam === 'teacher') {
        // 선생님 전용 유효성 검증
        if (
          !formData.nickname ||
          !formData.phone ||
          !formData.organization_type ||
          !formData.organization_name ||
          !formData.position
        ) {
          showToast('모든 필드를 입력해주세요.');
          return;
        }
      }

      // 최종 회원가입 처리
      SignupMutation(signupData);
      navigate('/signup-complete', { replace: true });
    }
  };
  /**이메일 인증코드 발송  */
  const { mutate: EmailCodeMutation } = useEmailVerificationMutation({
    onSuccess: (data) => {
      console.log('Email verification sent successfully:', data);
    },
    onError: (error) => {
      console.error('Error sending email verification:', error);
    },
  });

  const handleSendCode = () => {
    const emailData = getValues('email');
    if (!emailData) {
      showToast('이메일을 입력해주세요');
      return;
    }
    EmailCodeMutation({ email: emailData });
    setShowVerificationInput(true);
    start(); // 카운트다운 시작
  };

  /** 이메일 인증 코드 확인 */
  const { mutate: EmailVerificationMutation } =
    useEmailVerificationCodeMutation({
      onSuccess: () => {
        showToast('이메일 인증이 완료되었습니다.');
        reset(); // 카운트다운 초기화
        // setShowVerificationInput(false); // 인증 입력 필드 숨기기
      },
      onError: (error) => {
        const apiError = error as ApiErrorResponseDto;
        const errorMessage =
          apiError?.response?.data?.message ||
          '인증에 실패하였습니다. 다시 시도해주세요.';
        showToast(errorMessage);
      },
    });

  const handlelVerificationCode = () => {
    const emailData = getValues('email');
    const code = getValues('code');
    if (!code) {
      showToast('인증번호를 입력해주세요');
      return;
    }
    EmailVerificationMutation({ email: emailData, code: code }); // 인증번호 확인 처리
  };
  // 역할 파라미터 검증 (학생/선생님)
  useEffect(() => {
    if (roleParam === 'student' || roleParam === 'teacher') {
      setRole(role);
    } else {
      // 잘못된 role 파라미터인 경우
      navigate('/error');
    }
  }, [roleParam, navigate]);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSignup)}
        autoComplete='off'
        className='flex h-svh flex-col px-[28px] py-[30px]'
      >
        <div className='flex-grow'>
          <h1 className='mb-1 font-gMarket text-[43px] text-mainLogoTextColor'>
            수행쌤
          </h1>
          <div className='mb-[50px] text-lg text-captionColor'>
            {step === STEP.ACCOUNT_INFO && (
              <div>
                <p>새로운 계정 생성을 위해</p>
                <p>아이디와 비밀번호를 설정해 주세요.</p>
              </div>
            )}
            {step === STEP.PERSONAL_INFO && (
              <div>
                <p>계정을 완성하기 위해</p>
                <p>닉네임과 필요한 정보를 입력해주세요.</p>
              </div>
            )}
          </div>

          {step === STEP.ACCOUNT_INFO && (
            <div className='flex flex-col gap-4'>
              <div>
                <div className='flex justify-between gap-x-2'>
                  <AuthInput
                    type='email'
                    placeholder='example@email.com'
                    label='이메일'
                    {...register('email')}
                  />
                  <Button
                    type='button'
                    className='w-36 text-sm'
                    onClick={handleSendCode}
                  >
                    인증번호 발송
                  </Button>
                </div>
                {errors.email && (
                  <p className='mt-1 text-sm text-errorTextColor'>
                    {errors.email.message}
                  </p>
                )}
              </div>
              {showVerificationInput && (
                <div className='flex justify-between gap-x-2'>
                  <AuthInput
                    type='text'
                    label='인증번호'
                    className='w-7/12'
                    {...register('code')}
                  >
                    <span className='w-9 text-sm text-primaryColor'>
                      {formatTime()}
                    </span>
                  </AuthInput>
                  <Button
                    type='button'
                    className='w-36 text-sm'
                    onClick={handlelVerificationCode}
                  >
                    확인
                  </Button>
                </div>
              )}
              <div>
                <AuthInput
                  type='password'
                  placeholder='패스워드를 입력해주세요.'
                  label='패스워드'
                  {...register('password')}
                />
                {errors.password && (
                  <p className='mt-1 text-sm text-errorTextColor'>
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <AuthInput
                  type='password'
                  placeholder='패스워드를 재입력해주세요.'
                  label='패스워드 확인'
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <p className='mt-1 text-sm text-errorTextColor'>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {step === STEP.PERSONAL_INFO && roleParam === 'student' && (
            <div className='flex flex-col gap-4'>
              <div>
                <AuthInput
                  type='text'
                  placeholder='닉네임을 입력해주세요.'
                  label='닉네임'
                  {...register('nickname')}
                />
                {errors.nickname && (
                  <p className='mt-1 text-sm text-errorTextColor'>
                    {errors.nickname.message}
                  </p>
                )}
              </div>
              <div>
                <AuthInput
                  type='number'
                  placeholder='-없이 입력해주세요.'
                  label='연락처'
                  {...register('phone')}
                />
                {errors.phone && (
                  <p className='mt-1 text-sm text-errorTextColor'>
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div>
                <AuthInput
                  type='text'
                  placeholder='학교 이름을 입력해주세요.'
                  label='학교'
                  {...register('school')}
                />
                {errors.school && (
                  <p className='mt-1 text-sm text-errorTextColor'>
                    {errors.school.message}
                  </p>
                )}
              </div>
              <GradeSelector
                selectedGrade={selectedGrade}
                setSelectedGrade={setSelectedGrade}
              />
              <div>
                <AuthInput
                  type='text'
                  placeholder='희망진로를 입력해주세요.'
                  label='희망진로'
                  {...register('careeraspiration')}
                />
                {errors.careeraspiration && (
                  <p className='mt-1 text-sm text-errorTextColor'>
                    {errors.careeraspiration.message}
                  </p>
                )}
              </div>
              <div>
                <AuthInput
                  type='text'
                  placeholder='흥미를 입력해주세요.'
                  label='흥미'
                  {...register('interestrade')}
                />
                {errors.interestrade && (
                  <p className='mt-1 text-sm text-errorTextColor'>
                    {errors.interestrade.message}
                  </p>
                )}
              </div>
            </div>
          )}
          {step === STEP.PERSONAL_INFO && roleParam === 'teacher' && (
            <div className='flex flex-col gap-4'>
              <div>
                <AuthInput
                  type='text'
                  placeholder='닉네임을 입력해주세요.'
                  label='닉네임'
                  {...register('nickname')}
                />
                {errors.nickname && (
                  <p className='mt-1 text-sm text-errorTextColor'>
                    {errors.nickname.message}
                  </p>
                )}
              </div>
              <div>
                <AuthInput
                  type='number'
                  placeholder='-없이 입력해주세요.'
                  label='연락처'
                  {...register('phone')}
                />
                {errors.phone && (
                  <p className='mt-1 text-sm text-errorTextColor'>
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div>
                <AuthInput
                  type='text'
                  placeholder='소속종류를 입력해주세요.'
                  label='소속종류'
                  {...register('organization_type')}
                />
                {errors.organization_type && (
                  <p className='mt-1 text-sm text-errorTextColor'>
                    {errors.organization_type.message}
                  </p>
                )}
              </div>
              <div>
                <AuthInput
                  type='text'
                  placeholder='소속이름을 입력해주세요'
                  label='소속이름'
                  {...register('organization_name')}
                />
                {errors.organization_name && (
                  <p className='mt-1 text-sm text-errorTextColor'>
                    {errors.organization_name.message}
                  </p>
                )}
              </div>
              <div>
                <AuthInput
                  type='text'
                  placeholder='직급을 입력해주세요.'
                  label='직급'
                  {...register('position')}
                />
                {errors.position && (
                  <p className='mt-1 text-sm text-errorTextColor'>
                    {errors.position.message}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        <div className='mt-auto'>
          <Button variant='active' onClick={handleSignup}>
            {step === STEP.ACCOUNT_INFO ? '다음' : '가입하기'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SignupPage;
