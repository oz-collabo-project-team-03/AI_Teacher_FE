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
  <div className='flex w-[100%] flex-col gap-3'>
    <div className='flex items-center gap-1'>
      <span className='text-sm font-semibold text-left text-textMainColor'>
        {isOwnProfile ? `내 ${title}` : title}
      </span>
      {!isOwnProfile && (
        <span className='text-[15px] font-bold text-profilePointTextColor'>
          {post_count}
        </span>
      )}
    </div>
    <div className='grid w-full grid-cols-3 gap-1'>
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
          <div className='overflow-hidden border aspect-square border-postBorderColor'>
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
