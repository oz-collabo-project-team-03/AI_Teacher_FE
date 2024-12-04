import { FormProvider } from 'react-hook-form';
import Button from '../common/Button';
import AuthInput from '../auth/AuthInput';
import { GradeSelector } from '../auth/GradeButton';
import { useEditAccountForm } from '@/hooks/changeProfile/useEditAccountForm';
import { useProfileStore } from '@/stores/editProfile/useProfileStore';

const EditAccount = () => {
  const { userInfo } = useProfileStore();

  const {
    form,
    selectedGrade,
    setSelectedGrade,
    handleSubmit,
    onSubmit,
    register,
    formState: { errors },
  } = useEditAccountForm(userInfo?.role);

  return (
    <div className='flex h-full flex-col gap-1 px-4 pb-[30px] pt-[38px]'>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='h-full'>
          <div className='flex h-full flex-col justify-between'>
            <div className='flex flex-col gap-4'>
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

              {userInfo?.role === 'student' && (
                <>
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
                </>
              )}
            </div>

            <Button type='submit' variant='active'>
              변경 내용 저장
            </Button>
          </div>
        </form>
      </FormProvider>

      <button
        type='button'
        className='self-end text-sm font-medium text-captionColor hover:text-textMainColor/70'
      >
        탈퇴하기
      </button>
    </div>
  );
};

export default EditAccount;
