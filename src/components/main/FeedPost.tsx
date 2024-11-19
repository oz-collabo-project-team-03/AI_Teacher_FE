import FeedPostContent from './FeedPostContent';
import FeedPostSlider from './FeedPostSlider';
import FeedPostUserInfo from './FeedPostUserInfo';

const FeedPost = () => {
  return (
    <div>
      <div className='min-h-[368px] w-full'>
        <FeedPostUserInfo />
        <FeedPostSlider />
        <FeedPostContent />
      </div>
    </div>
  );
};

export default FeedPost;
