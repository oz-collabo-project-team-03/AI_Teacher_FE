import AuthInput from '@/components/auth/AuthInput';
import { ProfileInputFieldsProps } from '@/types/editProfile';

const ProfileCommonFields: React.FC<ProfileInputFieldsProps> = ({
  register,
  errors,
}) => (
  <>
    <div className='flex flex-col items-start gap-1'>
      <AuthInput
        type='text'
        label='닉네임'
        placeholder='닉네임을 입력해주세요.'
        {...register('nickname')}
      />
      {errors.nickname && (
        <span className='text-sm text-errorTextColor'>
          {errors.nickname.message}
        </span>
      )}
    </div>
  </>
);

export default ProfileCommonFields;
