import FeedPostContent from './FeedPostContent';
import FeedPostSlider from './FeedPostSlider';
import FeedPostUserInfo from './FeedPostUserInfo';

const FeedPost = () => {
  return (
    <article className='min-h-[368px] w-full'>
      <header>
        <FeedPostUserInfo />
      </header>
      <section>
        <FeedPostSlider />
      </section>
      <footer>
        <FeedPostContent />
      </footer>
    </article>
  );
};

export default FeedPost;
