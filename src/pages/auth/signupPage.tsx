import AuthInput from '@/components/auth/AuthInput';
import { GradeSelector } from '@/components/auth/GradeButton';
import Button from '@/components/common/Button';
import { useEmailVerification } from '@/hooks/signup/useEmailVerification';
import { useSignupForm } from '@/hooks/signup/useSignupForm';
import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const STEP = {
  ACCOUNT_INFO: 1,
  PERSONAL_INFO: 2,
};

const SignupPage = () => {
  const { role: roleParam } = useParams<{ role: 'student' | 'teacher' }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isSocial = searchParams.get('social') === 'true';

  // console.log('전체 searchParams:', searchParams.toString());
  // console.log('social 파라미터:', searchParams.get('social'));

  // console.log('isSocial 값:', isSocial);

  // 회원정보 입력
  const {
    form,
    step,
    setStep,
    selectedGrade,
    setSelectedGrade,
    handleSignup,
    register,
    formState: { errors },
    updateSocialStudentInfoMutation,
  } = useSignupForm(roleParam);

  // 이메일 검증
  const {
    showVerificationInput,
    formatTime,
    emailCodeMutation,
    emailVerificationMutation,
  } = useEmailVerification(form.getValues);

  const handleSubmit = isSocial
    ? updateSocialStudentInfoMutation
    : handleSignup;
  // console.log(
  //   '선택된 제출 핸들러:',
  //   handleSubmit === updateSocialStudentInfoMutation
  //     ? 'updateSocialInfoMutation'
  //     : 'handleSignup'
  // );
  // 역할 파라미터 검증 (학생/선생님)
  useEffect(() => {
    if (roleParam !== 'student' && roleParam !== 'teacher') {
      navigate('/error');
    }
  }, [roleParam, navigate]);

  useEffect(() => {
    if (isSocial) {
      // 소셜 로그인 사용자는 PERSONAL_INFO 단계로 강제 이동
      setStep(STEP.PERSONAL_INFO);
    }
  }, [isSocial, setStep]);

  if (!roleParam) {
    // 파라미터가 없을 때의 처리
    navigate('/');
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
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
                    onClick={emailCodeMutation}
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
                    onClick={emailVerificationMutation}
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
                  <p className='mt-1 whitespace-pre text-sm text-errorTextColor'>
                    {errors.password.message}
                  </p>
                )}
                {!errors.password && (
                  <p className='mt-1 whitespace-pre text-xs text-captionColor'>
                    문자, 숫자, 특수문자(!@#$%^&*)포함 10~20자리 이내
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
                  placeholder='이름을 입력해주세요. ex)김수행'
                  label='이름'
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
          <Button variant='active' onClick={handleSubmit}>
            {step === STEP.ACCOUNT_INFO ? '다음' : '가입하기'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SignupPage;
