import { useCallback, useState } from 'react';

import Heart from '../../assets/feedPost/heart.svg';
import chat from '../../assets/feedPost/chat.svg';
import fullHeart from '../../assets/feedPost/fullHeart.svg';
import useCommentModalStore from '@/stores/useCommentModalStore';

// import CommentModal from '../modal/CommentModal';

type FeedPostButtonProps = {
  like_count: number;
  comment_count: number;
};

const FeedPostButton = ({ like_count, comment_count }: FeedPostButtonProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(like_count);
  const { setIsModalOpen } = useCommentModalStore();

  const toggleHeart = useCallback(() => {
    setIsLiked((prev) => {
      const updatedLikeCount = prev ? likeCount - 1 : likeCount + 1;
      setLikeCount(Math.max(updatedLikeCount, 0));
      return !prev;
    });
  }, [likeCount]);

  const openCommentModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <li className='flex items-center gap-6'>
        <div className='flex gap-1'>
          <button onClick={toggleHeart} className=''>
            {!isLiked ? (
              <img src={Heart} alt='HeartIcon' />
            ) : (
              <img src={fullHeart} alt='fullHeartIcon' />
            )}
          </button>
          <span className='text-textMainColor'>{likeCount}</span>
        </div>

        <div className='flex gap-1'>
          <button onClick={openCommentModal}>
            <img src={chat} alt='fullHeartIcon' />
          </button>
          <p className='text-textMainColor'>{comment_count}</p>
        </div>

        {/* <span className='ml-[3px]'>{commentCount}</span> */}
      </li>
    </>
  );
};

export default FeedPostButton;
