import ToggleButton from './ToggleButton';
import studentIcon1 from '@/assets/editProfile/student/studentIcon1.png';
import teacherIcon1 from '@/assets/editProfile/teacher/teacherIcon1.png';

type ProfileHeaderProps = {
  role: 'student' | 'teacher';
  profileImage: string;
  nickname: string;
  description: string;
  subDescription: string;
  isOwnProfile: boolean;
};

const ProfileHeader = ({
  role,
  profileImage,
  nickname,
  description,
  subDescription,
  isOwnProfile,
}: ProfileHeaderProps) => {
  const defaultImage = role === 'student' ? studentIcon1 : teacherIcon1;

  return (
    <ul className='flex flex-col items-center gap-2'>
      <li className='relative h-[92px] w-[92px] rounded-full'>
        <img
          src={profileImage || defaultImage}
          onError={(e) => {
            e.currentTarget.src = defaultImage;
          }}
          alt='프로필 이미지'
          className='h-full w-full'
        />
        {isOwnProfile && <ToggleButton />}
      </li>
      <li className='flex flex-col items-center'>
        <p className='text-xl font-bold text-textMainColor'>{nickname}</p>
        <p className='mb-2 text-captionColor'>{description}</p>
        <p className='text-[14px] font-medium text-textMainColor'>
          {subDescription}
        </p>
      </li>
    </ul>
  );
};

export default ProfileHeader;
