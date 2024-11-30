import { Link } from 'react-router-dom';

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
    <header className='flex h-[54px] w-full items-center px-[7px] py-[8px]'>
      <Link to={`/my-page/${user_id}`}>
        <img
          src={profile_image}
          alt='studentProfileImage'
          className='mr-[9px] h-[40px] w-[40px] rounded-full'
        />
      </Link>
      <div className='flex flex-col gap-1'>
        <p className='text-[20px] font-medium leading-none'>{nickname}</p>
        <p className='text-[12px] font-medium leading-none text-hobbyText'>
          {career_aspiration}, {interest}
        </p>
      </div>
    </header>
  );
};

export default FeedPostUserInfo;
