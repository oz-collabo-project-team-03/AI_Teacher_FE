import AuthInput from '@/components/auth/AuthInput';
import { ProfileInputFieldsProps } from '@/types/editProfile';

const TeacherProfileFields: React.FC<ProfileInputFieldsProps> = ({
  register,
  errors,
}) => (
  <>
    <div className='flex flex-col items-start gap-1'>
      <AuthInput
        type='text'
        label='소속 이름'
        placeholder='소속 이름을 입력해주세요.'
        {...register('organization_name')}
      />
      {errors.organization_name && (
        <span className='text-sm text-errorTextColor'>
          {errors.organization_name.message}
        </span>
      )}
    </div>
    <div className='flex flex-col items-start gap-1'>
      <AuthInput
        type='text'
        label='소속 종류'
        placeholder='소속 종류를 입력해주세요.'
        {...register('organization_type')}
      />
      {errors.organization_type && (
        <span className='text-sm text-errorTextColor'>
          {errors.organization_type.message}
        </span>
      )}
    </div>
    <div className='flex flex-col items-start gap-1'>
      <AuthInput
        type='text'
        label='직급'
        placeholder='직급을 입력해주세요.'
        {...register('organization_position')}
      />
      {errors.organization_position && (
        <span className='text-sm text-errorTextColor'>
          {errors.organization_position.message}
        </span>
      )}
    </div>
  </>
);

export default TeacherProfileFields;
