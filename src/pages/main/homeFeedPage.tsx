import FeedPost from '../../components/main/FeedPost';
import MainHeader from '../../components/common/MainHeader';
import { twMerge } from 'tailwind-merge';

const HomeFeedPage = () => {
  const posts = [1, 2, 3]; //임시배열
  const hideScrollbar = true;

  return (
    <div className='h-screen'>
      <MainHeader />
      <div
        className={twMerge(
          'h-full overflow-auto pb-[62px] pt-[72px]',
          hideScrollbar && 'scrollbar-hide'
        )}
      >
        {posts.map((index) => (
          <FeedPost key={index} />
        ))}
      </div>
    </div>
  );
};

export default HomeFeedPage;
