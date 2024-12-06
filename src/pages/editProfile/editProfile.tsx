import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import ProfileImages from '@/components/editProfile/ProfileImages';
import StudentProfileFields from '@/components/editProfile/inputFields/StudentProfileFields';
import TeacherProfileFields from '@/components/editProfile/inputFields/TeacherProfileFields';
import { AxiosError } from 'axios';
import { useToast } from '@/hooks/useToast';
import { useEffect, useState } from 'react';
import { useEditProfileMutation } from '@/api/editProfile/editProfile.hooks';
import { EditProfileRequestParams } from '@/types/editProfileType';
import { useProfileStore } from '@/stores/editProfile/useProfileStore';

const EditProfile = () => {
  const { userInfo, updateProfile } = useProfileStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      showToast('로그인 후 이용바랍니다.');
      navigate('/login');
    }
  }, [userInfo]);

  const form = useForm<EditProfileRequestParams>({
    defaultValues: {
      role: userInfo?.role,
    },
    mode: 'onChange',
  });

  const {
    register,
    formState: { errors },
  } = form;

  const { mutate: editProfileMutation } = useEditProfileMutation({
    onSuccess: () => {
      updateProfile(form.getValues(), selectedImageUrl);
      navigate('/my-page', { replace: true });
      showToast('회원 정보 변경 완료');
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

  const handleEditProfile = () => {
    const profileData = {
      ...form.getValues(),
      profile_image: selectedImageUrl,
    };
    editProfileMutation(profileData);
  };

  if (!userInfo) {
    return null;
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleEditProfile)}
        className='flex h-full flex-col pt-[72px]'
        autoComplete='off'
      >
        <Header title='프로필 수정' />

        <div className='flex h-full w-full flex-col overflow-y-scroll px-4 pb-12 pt-9'>
          <ProfileImages
            selectedIndex={selectedImageIndex}
            onImageSelect={handleImageSelect}
            userType={userInfo?.role}
            currentImageUrl={userInfo.profile_image}
          />

          <div className='flex flex-col gap-4 pb-4'>
            {userInfo?.role === 'student' && (
              <StudentProfileFields register={register} errors={errors} />
            )}
            {userInfo?.role === 'teacher' && (
              <TeacherProfileFields register={register} errors={errors} />
            )}
          </div>

          <Link to='/change-profile' className='mb-8 w-fit'>
            <span className='text-sm font-medium text-primaryColor hover:text-primaryHoverColor'>
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
