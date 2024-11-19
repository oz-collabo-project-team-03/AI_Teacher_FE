import FeedPost from '../../components/main/FeedPost';
import MainHeader from '../../components/common/MainHeader';

const HomeFeedPage = () => {
  const posts = [1, 2, 3]; //임시배열

  return (
    <div>
      <div className='fixed left-1/2 top-0 w-full -translate-x-1/2 transform bg-white md:w-[425px] lg:w-[425px]'>
        <MainHeader />
      </div>
      <div
        className='scrollbar-none overflow-y-auto pb-[62px] pt-[72px]'
        style={{ height: 'calc(100vh - 72px)' }}
      >
        {posts.map((index) => (
          <FeedPost key={index} />
        ))}
      </div>
    </div>
  );
};

export default HomeFeedPage;
