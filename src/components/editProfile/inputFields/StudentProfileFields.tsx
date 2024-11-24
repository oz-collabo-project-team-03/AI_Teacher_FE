import AuthInput from '@/components/auth/AuthInput';
import { ProfileInputFieldsProps } from '@/types/editProfile';

const StudentProfileFields: React.FC<ProfileInputFieldsProps> = ({
  register,
  errors,
}) => (
  <>
    <div className='flex flex-col items-start gap-1'>
      <AuthInput
        type='text'
        label='상태 메세지'
        placeholder='상태 메세지를 입력해주세요.'
        {...register('description')}
      />
      {errors.description && (
        <span className='text-sm text-errorTextColor'>
          {errors.description.message}
        </span>
      )}
    </div>
    <div className='flex flex-col items-start gap-1'>
      <AuthInput
        type='text'
        label='희망진로'
        placeholder='희망진로를 입력해주세요.'
        {...register('career_aspiration')}
      />
      {errors.career_aspiration && (
        <span className='text-sm text-errorTextColor'>
          {errors.career_aspiration.message}
        </span>
      )}
    </div>
    <div className='flex flex-col items-start gap-1'>
      <AuthInput
        type='text'
        label='흥미'
        placeholder='흥미를 입력해주세요.'
        {...register('interest')}
      />
      {errors.interest && (
        <span className='text-sm text-errorTextColor'>
          {errors.interest.message}
        </span>
      )}
    </div>
  </>
);

export default StudentProfileFields;
