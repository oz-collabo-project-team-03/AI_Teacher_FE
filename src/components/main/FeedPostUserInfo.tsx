import { Link } from 'react-router-dom';
import studentIcon1 from '@/assets/editProfile/student/studentIcon1.png';
import { useProfile } from '@/hooks/useProfile';

type FeedPostUserInfoProps = {
  user_id: number;
  nickname: string;
  profile_image: string;
  career_aspiration: string;
  interest: string;
};

const FeedPostUserInfo = ({
  user_id,
  nickname,
  profile_image,
  career_aspiration,
  interest,
}: FeedPostUserInfoProps) => {
  const { profileData } = useProfile();
  const localStorageId = Number(localStorage.getItem('userId'));

  const getMyPagePath = () => {
    if (user_id === localStorageId) {
      return profileData?.role === 'student' ? '/my-page' : '/teacher/my-page';
    }
    return profileData?.role === 'student'
      ? `/my-page/${user_id}`
      : `/teacher/my-page/${user_id}`;
  };

  return (
    <header className='flex h-[54px] items-center gap-2 px-[9px] py-[8px]'>
      <Link to={getMyPagePath()}>
        <img
          src={profile_image || studentIcon1}
          onError={(e) => {
            e.currentTarget.src = studentIcon1;
          }}
          alt='studentProfileImage'
          className='h-[40px] w-[40px] rounded-full'
        />
      </Link>
      <ul className='flex h-full flex-col justify-between'>
        <li className='text-[20px] font-medium leading-none text-textMainColor'>
          {nickname}
        </li>
        <li className='text-[14px] font-medium leading-none text-hobbyText'>
          {career_aspiration}, {interest}
        </li>
      </ul>
    </header>
  );
};

export default FeedPostUserInfo;
