type CommunityInfoProps = {
  role: string;
  post_count: number;
  like_count: number;
  comment_count: number;
};

const CommunityInfo = ({
  role,
  post_count,
  like_count,
  comment_count,
}: CommunityInfoProps) => {
  const communityInfo = [
    {
      label: role === 'student' ? '게시글' : '협업 게시글',
      value: post_count,
    },
    { label: '좋아요', value: like_count },
    { label: '받은 댓글', value: comment_count },
  ];

  return (
    <ul className='flex w-full items-center justify-center gap-6 px-4'>
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
