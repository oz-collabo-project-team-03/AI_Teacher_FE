import { Post } from '@/types/myPageType';
import { Link } from 'react-router-dom';

type PostGridProps = {
  title: string;
  posts: Post[];
  userId?: string;
  post_count: number;
  isOwnProfile: boolean;
};

const PostGrid = ({
  posts,
  title,
  userId,
  post_count,
  isOwnProfile,
}: PostGridProps) => (
  <div className='flex w-[360px] flex-col gap-3'>
    <div className='flex items-center gap-1'>
      <span className='text-sm font-semibold text-left text-textMainColor'>
        {title}
      </span>
      {!isOwnProfile && (
        <span className='text-[15px] font-bold text-profilePointTextColor'>
          {post_count}
        </span>
      )}
    </div>
    <div className='flex flex-wrap gap-[6px]'>
      {posts.map((post) => (
        <Link
          key={post.post_id}
          to={
            userId
              ? `/posts/${userId}?selected=${post.post_id}`
              : `/posts?selected=${post.post_id}`
          }
          state={{ scrollToId: post.post_id }}
        >
          <div className='h-[116px] w-[116px] overflow-hidden border border-postBorderColor'>
            <img
              src={post.post_image}
              alt='게시글 이미지'
              className='object-cover w-full h-full'
            />
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default PostGrid;
