import FeedPostButton from '../../components/main/FeedPostButton';
import { Link } from 'react-router-dom';

type FeedPostContentProps = {
  like_count: number;
  comment_count: number;
  content: string;
  teacher?: {
    user_id: string;
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
    <ul className='flex flex-col gap-2 px-[12px] font-medium'>
      <FeedPostButton like_count={like_count} comment_count={comment_count} />
      {/* 협업멘트 */}
      {teacher && (
        <li className='flex w-full items-center gap-1 text-[15px]'>
          <Link to={`/teacher/my-page/${teacher.user_id}`}>
            <img
              src={teacher.profile_image}
              alt='teacherProfileImage'
              className='h-[20px] w-[20px]'
            />
          </Link>
          <span className='text-textMainColor'>
            {teacher.nickname} 선생님과 협업하였습니다.
          </span>
        </li>
      )}

      {/* 댓글축약 */}
      <li className='flex w-full items-center'>
        <p className='mr-3 text-textMainColor'>{content}</p>
        {/* <button className='self-end text-[14px] text-captionColor'>
          더보기
        </button> */}
      </li>
      <time dateTime='2024-10-15' className='text-[14px] text-captionColor'>
        {formatDate(created_at)}
      </time>
    </ul>
  );
};

export default FeedPostContent;
