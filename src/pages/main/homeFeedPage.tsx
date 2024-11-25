import FeedPost from '../../components/main/FeedPost';
import MainHeader from '../../components/main/MainHeader';
import { twMerge } from 'tailwind-merge';

const HomeFeedPage = () => {
  const posts = [1, 2, 3]; //임시배열
  const hideScrollbar = true;

  return (
    <div className='h-svh'>
      <MainHeader />
      <div
        className={twMerge(
          'h-full overflow-auto pb-[62px] pt-[72px]',
          hideScrollbar && 'scrollbar-hide'
        )}
      >
        <div className='space-y-8'>
          {' '}
          {/* 각 게시물 간 여백 추가 */}
          {posts.map((index) => (
            <FeedPost key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeFeedPage;
