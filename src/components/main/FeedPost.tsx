import FeedPostContent from './FeedPostContent';
import FeedPostSlider from './FeedPostSlider';
import FeedPostUserInfo from './FeedPostUserInfo';

const FeedPost = () => {
  return (
    <div>
      <div className='h-[368px] w-full [background-color:#D7B26D]'>
        <FeedPostUserInfo />
        <FeedPostSlider />
        <FeedPostContent />
      </div>
    </div>
  );
};

export default FeedPost;
