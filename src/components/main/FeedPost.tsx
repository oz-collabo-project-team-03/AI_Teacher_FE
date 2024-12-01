import { PostDetail } from '@/types/postType';
import FeedPostContent from './FeedPostContent';
import FeedPostSlider from './FeedPostSlider';
import FeedPostUserInfo from './FeedPostUserInfo';

type FeedPostProps = {
  posts: PostDetail;
};

const FeedPost = ({ posts }: FeedPostProps) => {
  const feedPostuserInfoProps = {
    user_id: posts.user_id,
    nickname: posts.nickname,
    profile_image: posts.profile_image,
    career_aspiration: posts.career_aspiration,
    interest: posts.interest,
  };

  const feedPostsliderProps = {
    image1: posts.image1,
    image2: posts.image2,
    image3: posts.image3,
  };

  const feedPostcontentProps = {
    like_count: posts.like_count,
    comment_count: posts.comment_count,
    content: posts.content,
    teacher: posts.teacher,
    created_at: posts.created_at,
  };

  return (
    <article className='min-h-[368px] w-full' id={posts.post_id}>
      <FeedPostUserInfo {...feedPostuserInfoProps} />

      <FeedPostSlider {...feedPostsliderProps} />

      <FeedPostContent {...feedPostcontentProps} />
    </article>
  );
};

export default FeedPost;
