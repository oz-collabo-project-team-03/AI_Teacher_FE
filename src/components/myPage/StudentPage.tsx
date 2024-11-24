import { StudentMyPageResponse } from '../../types/myPageType.ts';
import ToggleButton from './ToggleButton.tsx';

type StudentPageProps = {
  userInfo: StudentMyPageResponse;
  communityInfo: { label: string; value: number }[];
};

const StudentPage = ({ userInfo, communityInfo }: StudentPageProps) => {
  return (
    <>
      <ul className='flex flex-col items-center gap-2'>
        <li className='relative h-[92px] w-[92px] rounded-full'>
          <img
            src={userInfo.profile_image}
            alt='학생 기본 이미지'
            className='h-full w-full'
          />
          <ToggleButton />
        </li>
        <li className='flex flex-col items-center'>
          <p className='text-xl font-bold text-textMainColor'>
            {userInfo.nickname}
          </p>
          <p className='mb-2 text-captionColor'>{`${userInfo.career_aspiration}, ${userInfo.interest}`}</p>
          <p className='text-[13px] font-medium text-textMainColor'>
            {userInfo.description}
          </p>
        </li>
      </ul>

      <ul className='flex items-center justify-center gap-6'>
        {communityInfo.map((info, index) => (
          <li
            key={index}
            className='flex h-[50px] w-[83px] flex-col items-center justify-center rounded-[10px] shadow-profileInfoShadow'
          >
            <p className='text-[13px] font-normal text-textMainColor'>
              {info.label}
            </p>
            <p className='text-[15px] font-bold text-profilePointTextColor'>
              {info.value}
            </p>
          </li>
        ))}
      </ul>

      <div className='flex w-[360px] flex-col gap-3'>
        <p className='text-left text-xs font-medium text-captionColor'>
          내 게시글
        </p>
        <div className='flex flex-wrap gap-[6px]'>
          {userInfo.posts.map((post) => (
            <div
              key={post.post_id}
              className='h-[116px] w-[116px] overflow-hidden border border-postBorderColor'
            >
              <img
                src={post.post_image}
                alt='게시글 이미지'
                className='h-full w-full object-cover'
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StudentPage;
