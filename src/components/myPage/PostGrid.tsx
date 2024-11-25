import { Post } from '@/types/myPageType';

type PostGridProps = {
  posts: Post[];
  title: string;
};

const PostGrid = ({ posts, title }: PostGridProps) => (
  <div className='flex w-[360px] flex-col gap-3'>
    <p className='text-xs font-medium text-left text-captionColor'>{title}</p>
    <div className='flex flex-wrap gap-[6px]'>
      {posts.map((post) => (
        <div
          key={post.post_id}
          className='h-[116px] w-[116px] overflow-hidden border border-postBorderColor'
        >
          <img
            src={post.post_image}
            alt='게시글 이미지'
            className='object-cover w-full h-full'
          />
        </div>
      ))}
    </div>
  </div>
);

export default PostGrid;
