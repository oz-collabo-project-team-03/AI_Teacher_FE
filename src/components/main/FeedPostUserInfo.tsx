import { Link } from 'react-router-dom';
import studentDefaultIcon from '@/assets/editProfile/student/studentDefaultIcon.png';

type FeedPostUserInfoProps = {
  user_id: string;
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
  return (
    <header className='flex h-[54px] items-center gap-2 px-[9px] py-[8px]'>
      <Link to={`/my-page/${user_id}`}>
        <img
          src={profile_image || studentDefaultIcon}
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
