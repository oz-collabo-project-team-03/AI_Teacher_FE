import FeedPostButton from '../../components/main/FeedPostButton';

type FeedPostContentProps = {
  like_count: number;
  comment_count: number;
  content: string;
  teacher?: {
    nickname: string;
    profile_image: string;
  };
  created_at: string;
};

const FeedPostContent = ({
  like_count,
  comment_count,
  content,
  teacher,
  created_at,
}: FeedPostContentProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear().toString().slice(2)}년 ${(date.getMonth() + 1).toString().padStart(2, '0')}월 ${date.getDate().toString().padStart(2, '0')}일`;
  };

  return (
    <ul className='h-[102px] w-full px-[12px] py-[7px] font-medium'>
      <FeedPostButton like_count={like_count} comment_count={comment_count} />
      {/* 협업멘트 */}
      {teacher && (
        <li className='mt-[6px] flex h-[20px] w-full items-center text-[14px]'>
          <img
            src={teacher.profile_image}
            alt='teacherProfileImage'
            className='mr-[5px] h-[20px] w-[20px]'
          />
          <span>{teacher.nickname} 선생님과 협업하였습니다.</span>
        </li>
      )}

      {/* 댓글축약 */}
      <li className='my-[7px] flex h-[14px] w-full'>
        <p className='mr-[6px] text-[14px]'>{content}</p>
        {/* <button className='text-[14px] text-captionColor'>더보기</button> */}
      </li>
      <time
        dateTime='2024-10-15'
        className='block w-full text-[14px] text-captionColor'
      >
        {formatDate(created_at)}
      </time>
    </ul>
  );
};

export default FeedPostContent;
