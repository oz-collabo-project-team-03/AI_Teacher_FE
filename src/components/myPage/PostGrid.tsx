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
      <span className='text-left text-sm font-semibold text-textMainColor'>
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
          {post.post_image ? (
            <div className='aspect-square overflow-hidden border border-postBorderColor'>
              <img
                src={post.post_image}
                alt='게시글 이미지'
                className='h-full w-full object-cover'
              />
            </div>
          ) : (
            <div className='flex aspect-square items-center justify-center border bg-gray-50/50'>
              <p className='text-captionColor'>이미지 오류</p>
            </div>
          )}
        </Link>
      ))}
    </div>
  </div>
);

export default PostGrid;
