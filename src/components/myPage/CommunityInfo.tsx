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
  );
};

export default CommunityInfo;
