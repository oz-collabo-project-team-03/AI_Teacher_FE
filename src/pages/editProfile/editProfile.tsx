import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthInput from '../../components/auth/AuthInput';
import Button from '../../components/common/Button';
import Header from '../../components/common/Header';
import ProfileImages from '../../components/editProfile/ProfileImages';

const EditProfile = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(selectedImageIndex === index ? -1 : index);
  };

  return (
    <div className='flex h-full flex-col'>
      <Header title='프로필 수정' />
      <div className='flex h-full w-full flex-col justify-between overflow-y-auto px-4 pb-12 pt-9'>
        <div className='flex flex-col'>
          <ProfileImages
            selectedIndex={selectedImageIndex}
            onImageSelect={handleImageSelect}
            userType='student'
            // userType='teacher'
          />
          <form className='flex flex-col gap-4 pb-2'>
            {/* 공통 입력 필드 */}
            <AuthInput
              type='text'
              label='닉네임'
              placeholder='닉네임을 입력해주세요.'
            />

            {/* 학생 전용 입력 필드 */}
            <>
              <AuthInput
                type='text'
                label='상태 메세지'
                placeholder='상태 메세지를 입력해주세요.'
              />
              <AuthInput
                type='text'
                label='희망진로'
                placeholder='희망진로를 입력해주세요.'
              />
              <AuthInput
                type='text'
                label='흥미'
                placeholder='흥미를 입력해주세요.'
              />
            </>

            {/* 교사 전용 입력 필드 */}
            {/* <>
              <AuthInput
                type='text'
                label='소속 종류'
                placeholder='소속 종류를 입력해주세요.'
              />
              <AuthInput
                type='text'
                label='소속 이름'
                placeholder='소속 이름을 입력해주세요.'
              />
              <AuthInput
                type='text'
                label='직급'
                placeholder='직급을 입력해주세요.'
              />
            </> */}
          </form>
          <Link to='/change-profile' className='inline-block pb-4'>
            <span className='text-sm font-medium text-primaryColor hover:text-primaryColor'>
              회원 정보 변경
            </span>
          </Link>
        </div>
        <Button variant='active' className='mt-auto'>
          변경 내용 저장
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;
