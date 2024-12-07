import AuthInput from '@/components/auth/AuthInput';
import { ProfileInputFieldsProps } from '@/types/editProfileType';

const TeacherProfileFields: React.FC<ProfileInputFieldsProps> = ({
  register,
  errors,
}) => (
  <>
    <div className='flex flex-col items-start gap-1'>
      <AuthInput
        type='text'
        label='이름'
        placeholder='이름을 입력해주세요.'
        {...register('nickname')}
      />
      {errors.nickname && (
        <span className='text-sm text-errorTextColor'>
          {errors.nickname.message}
        </span>
      )}
    </div>
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
        {...register('position')}
      />
      {errors.position && (
        <span className='text-sm text-errorTextColor'>
          {errors.position.message}
        </span>
      )}
    </div>
  </>
);

export default TeacherProfileFields;

('{"detail":[{"type":"missing","loc":["body","nickname"],"msg":"Field required","input":{"profile_image":"teacherIcon1"}},{"type":"missing","loc":["body","position"],"msg":"Field required","input":{"profile_image":"teacherIcon1"}}]}');
