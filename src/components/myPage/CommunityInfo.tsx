import { useState, useEffect } from 'react';
import { MyPageResponseData } from '@/types/myPageType';

type CommunityInfoProps = {
  userInfo: MyPageResponseData;
};

const CommunityInfo = ({ userInfo }: CommunityInfoProps) => {
  const [communityInfo, setCommunityInfo] = useState<
    { label: string; value: number }[]
  >([]);

  useEffect(() => {
    if (userInfo) {
      setCommunityInfo([
        {
          label: userInfo.role === 'student' ? '게시글' : '협업 게시글',
          value: userInfo.post_count,
        },
        { label: '좋아요', value: userInfo.like_count },
        { label: '작성 댓글', value: userInfo.comment_count },
      ]);
    }
  }, [userInfo]);

  return (
    <ul className='flex items-center justify-center w-full gap-6 px-4'>
      {communityInfo.map((info, index) => (
        <li
          key={index}
          className='flex w-[30%] flex-col items-center justify-center rounded-[10px] py-[1%] shadow-profileInfoShadow'
        >
          <p className='text-[14px] font-normal text-textMainColor'>
            {info.label}
          </p>
          <p className='text-[15px] font-bold text-profilePointTextColor'>
            {info.value}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default CommunityInfo;
