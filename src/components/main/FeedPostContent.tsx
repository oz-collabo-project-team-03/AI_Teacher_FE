import Heart from '../../assets/feedPost/heart.svg';
import chat from '../../assets/feedPost/chat.svg';
import fullHeart from '../../assets/feedPost/fullHeart.svg';
import teacher from '../../assets/profileEdit/teacher/teDefaultIcon.svg';
import useFeedPostStore from '../../stores/useFeedPostStore';

const FeedPostContent = () => {
  const { isLiked, toggleHeart, likeCount, commentCount, addComment } =
    useFeedPostStore();

  const feedPostHandleClick = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    action();
  };

  return (
    <div className='h-[102px] w-full px-[12px] py-[7px] font-medium'>
      <div className='flex h-[20px] w-full items-center'>
        <div
          onClick={(e) => feedPostHandleClick(e, toggleHeart)}
          className='h-[20px] w-[20px]'
        >
          {!isLiked ? (
            <img src={Heart} alt='HeartIcon' />
          ) : (
            <img src={fullHeart} alt='fullHeartIcon' />
          )}
        </div>
        <span className='ml-[3px] mr-[25px] h-[20px]'>{likeCount}</span>
        <img
          src={chat}
          alt='fullHeartIcon'
          className='h-[17px] w-[17px]'
          onClick={(e) => feedPostHandleClick(e, addComment)}
        />
        <span className='ml-[3px] h-[20px]'>{commentCount}</span>
      </div>

      {/* 협업멘트 */}
      <div className='mt-[6px] flex h-[20px] w-full items-center'>
        <img
          src={teacher}
          alt='teacherProfileImage'
          className='mr-[3px] h-[20px] w-[20px]'
        />
        <span className='text-[10px]'>도인핑 선생님과 협업하였습니다.</span>
      </div>

      {/* 댓글축약 */}
      <div className='my-[7px] flex h-[12px] w-full text-[10px]'>
        <div className='mr-[6px]'>
          이번에 수학 수업 수행평가 해봤습니다 ㅎㅎ ...
        </div>
        <span>더보기</span>
      </div>
      <div className='h-[12px] w-full text-[10px] text-captionColor'>
        24년 10월 15일
      </div>
    </div>
  );
};

export default FeedPostContent;
