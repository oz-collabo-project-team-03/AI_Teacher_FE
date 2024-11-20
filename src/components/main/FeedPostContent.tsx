import Heart from '../../assets/feedPost/heart.svg';
import chat from '../../assets/feedPost/chat.svg';
import fullHeart from '../../assets/feedPost/fullHeart.svg';
import teacher from '../../assets/editProfile/teacher/teacherDefaultIcon.png';
import useFeedPostStore from '../../stores/useFeedPostStore';

const FeedPostContent = () => {
  const { isLiked, toggleHeart, likeCount, commentCount, addComment } =
    useFeedPostStore();

  const feedPostHandleClick = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    action();
  };

  return (
    <ul className='h-[102px] w-full px-[12px] py-[7px] font-medium'>
      <li className='flex h-[20px] w-full items-center'>
        <button
          onClick={(e) => feedPostHandleClick(e, toggleHeart)}
          className='h-[20px] w-[20px]'
        >
          {!isLiked ? (
            <img src={Heart} alt='HeartIcon' />
          ) : (
            <img src={fullHeart} alt='fullHeartIcon' />
          )}
        </button>
        <span className='ml-[3px] mr-[25px]'>{likeCount}</span>
        <button
          className='h-[17px] w-[17px]'
          onClick={(e) => feedPostHandleClick(e, addComment)}
        >
          <img src={chat} alt='fullHeartIcon' />
        </button>

        <span className='ml-[3px]'>{commentCount}</span>
      </li>

      {/* 협업멘트 */}
      <li className='mt-[6px] flex h-[20px] w-full items-center text-[14px]'>
        <img
          src={teacher}
          alt='teacherProfileImage'
          className='mr-[5px] h-[20px] w-[20px]'
        />
        <span>도인핑 선생님과 협업하였습니다.</span>
      </li>

      {/* 댓글축약 */}
      <li className='my-[7px] flex h-[14px] w-full'>
        <p className='mr-[6px] text-[14px]'>
          이번에 수학 수업 수행평가 해봤습니다 ㅎㅎ ...
        </p>
        <button className='text-[14px] text-captionColor'>더보기</button>
      </li>
      <time
        dateTime='2024-10-15'
        className='block w-full text-[14px] text-captionColor'
      >
        24년 10월 15일
      </time>
    </ul>
  );
};

export default FeedPostContent;
