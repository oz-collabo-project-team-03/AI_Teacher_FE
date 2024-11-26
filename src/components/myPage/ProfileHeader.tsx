import ToggleButton from './ToggleButton';

type ProfileHeaderProps = {
  profileImage: string;
  nickname: string;
  description: string;
  subDescription: string;
  isOwnProfile: boolean;
};

const ProfileHeader = ({
  profileImage,
  nickname,
  description,
  subDescription,
  isOwnProfile,
}: ProfileHeaderProps) => (
  <ul className='flex flex-col items-center gap-2'>
    <li className='relative h-[92px] w-[92px] rounded-full'>
      <img src={profileImage} alt='프로필 이미지' className='w-full h-full' />
      {isOwnProfile && <ToggleButton />}
    </li>
    <li className='flex flex-col items-center'>
      <p className='text-xl font-bold text-textMainColor'>{nickname}</p>
      <p className='mb-2 text-captionColor'>{description}</p>
      <p className='text-[13px] font-medium text-textMainColor'>
        {subDescription}
      </p>
    </li>
  </ul>
);

export default ProfileHeader;
