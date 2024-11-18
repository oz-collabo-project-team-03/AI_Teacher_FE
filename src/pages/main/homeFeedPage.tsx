import FeedPost from '../../components/main/FeedPost';
import MainHeader from '../../components/common/MainHeader';

const HomeFeedPage = () => {
  const posts = [1, 2, 3]; //임시배열

  return (
    <div>
      <MainHeader />
      <div>
        {posts.map((index) => (
          <FeedPost key={index} />
        ))}
      </div>
    </div>
  );
};

export default HomeFeedPage;
