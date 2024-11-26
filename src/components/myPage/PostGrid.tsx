import { Post } from '@/types/myPageType';
import { Link } from 'react-router-dom';

type PostGridProps = {
  title: string;
  posts: Post[];
  userId?: string;
};

const PostGrid = ({ posts, title, userId }: PostGridProps) => (
  <div className='flex w-[360px] flex-col gap-3'>
    <p className='text-left text-xs font-medium text-captionColor'>{title}</p>
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
              className='h-full w-full object-cover'
            />
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default PostGrid;
