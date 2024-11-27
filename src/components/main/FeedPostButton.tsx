import { useCallback, useState } from 'react';

import Heart from '../../assets/feedPost/heart.svg';
import chat from '../../assets/feedPost/chat.svg';
import fullHeart from '../../assets/feedPost/fullHeart.svg';
import useFeedPostStore from '@/stores/useFeedPostStore';

// import CommentModal from '../modal/CommentModal';

const FeedPostButton = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(13);
  const { setIsModalOpen } = useFeedPostStore();

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
      <li className='flex h-[20px] w-full items-center'>
        <button onClick={toggleHeart} className='h-[20px] w-[20px]'>
          {!isLiked ? (
            <img src={Heart} alt='HeartIcon' />
          ) : (
            <img src={fullHeart} alt='fullHeartIcon' />
          )}
        </button>
        <span className='ml-[3px] mr-[25px]'>{likeCount}</span>
        <button className='h-[17px] w-[17px]' onClick={openCommentModal}>
          <img src={chat} alt='fullHeartIcon' />
        </button>
        <p className='ml-[3px]'>13</p>

        {/* <span className='ml-[3px]'>{commentCount}</span> */}
      </li>
    </>
  );
};

export default FeedPostButton;
