import { FormProvider, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import ProfileImages from '@/components/editProfile/ProfileImages';
import CommonFields from '@/components/editProfile/inputFields/CommonFields';
import StudentProfileFields from '@/components/editProfile/inputFields/StudentProfileFields';
import TeacherProfileFields from '@/components/editProfile/inputFields/TeacherProfileFields';
import { AxiosError } from 'axios';
import { useToast } from '@/hooks/useToast';
import { useEffect, useState } from 'react';
import { useEditProfileMutation } from '@/api/editProfile/editProfile.hooks';
import { EditProfileRequestData } from '@/types/editProfile';
import { useProfileStore } from '@/stores/editProfile/useProfileStore';

const profileFormSchema = zod.discriminatedUnion('role', [
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
    nickname: zod
      .string()
      .min(2, { message: '닉네임은 최소 2글자 이상이어야 합니다.' }),
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

const EditProfile = () => {
  const { userInfo, updateProfile } = useProfileStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const { showToast } = useToast();
  const navigate = useNavigate();

  // const role =
  //   (sessionStorage.getItem('role') as 'student' | 'teacher') || undefined;

  //? 임시 사용 변수
  const role = userInfo?.role || 'student';

  useEffect(() => {
    if (!userInfo) {
      showToast('로그인 후 이용바랍니다.');
      navigate('/login');
    }
  }, [userInfo]);

  const form = useForm<EditProfileRequestData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      role: role,
      nickname: '',
      profile_image: '',
      description: '',
      career_aspiration: '',
      interest: '',
      organization_name: '',
      organization_type: '',
      organization_position: '',
    },
    mode: 'onChange',
  });

  const {
    register,
    formState: { errors },
  } = form;

  const editProfileMutation = useEditProfileMutation({
    onSuccess: (data) => {
      updateProfile(data);
      navigate('/my-page');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data || '알 수 없는 오류가 발생했습니다';
        showToast(`업데이트 실패: ${errorMessage}`);
      } else {
        showToast('프로필 업데이트 중 오류가 발생했습니다.');
      }
      console.error('프로필 업데이트 오류:', error);
    },
  });

  const handleImageSelect = (index: number, imageUrl: string) => {
    setSelectedImageIndex(index);
    setSelectedImageUrl(imageUrl);
  };

  const handleInvalid = () => {
    showToast('모든 필드를 채워주세요.');
  };

  const handleEditProfile = (data: EditProfileRequestData) => {
    const profileData: EditProfileRequestData = {
      ...data,
      profile_image: selectedImageUrl,
    };
    editProfileMutation.mutate(profileData);
  };

  if (!userInfo) {
    return null;
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleEditProfile, handleInvalid)}
        className='flex flex-col h-full'
        autoComplete='off'
      >
        <Header title='프로필 수정' />

        <div className='flex flex-col w-full h-full px-4 pb-12 overflow-y-scroll pt-9'>
          <ProfileImages
            selectedIndex={selectedImageIndex}
            onImageSelect={handleImageSelect}
            userType={role}
            currentImageUrl={userInfo.profile_image}
          />

          <div className='flex flex-col gap-4 pb-4'>
            <CommonFields register={register} errors={errors} />
            {role === 'student' && (
              <StudentProfileFields register={register} errors={errors} />
            )}
            {role === 'teacher' && (
              <TeacherProfileFields register={register} errors={errors} />
            )}
          </div>

          <Link to='/change-profile' className='mb-8 w-fit'>
            <span className='text-sm font-medium text-primaryColor hover:text-primaryColor'>
              회원 정보 변경
            </span>
          </Link>

          <Button variant='active' type='submit' className='mt-auto'>
            변경 내용 저장
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditProfile;
