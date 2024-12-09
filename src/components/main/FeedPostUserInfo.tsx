import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import studentIcon1 from '@/assets/editProfile/student/studentIcon1.png';
import { useProfile } from '@/hooks/useProfile';
import { useState } from 'react';
import { useDeletePost } from '@/hooks/deletePost/useDeletePost';
import { useQueryClient } from '@tanstack/react-query';

type FeedPostUserInfoProps = {
  user_id: number;
  nickname: string;
  profile_image: string;
  career_aspiration: string;
  interest: string;
  post_id: string;
};

const FeedPostUserInfo = ({
  user_id,
  nickname,
  profile_image,
  career_aspiration,
  interest,
  post_id,
}: FeedPostUserInfoProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { profileData } = useProfile();
  const { deletePostMutation } = useDeletePost();

  const queryClient = useQueryClient();

  // const localStorageId = Number(localStorage.getItem('userId'));

  const isOwnPost = user_id === profileData?.id;

  const getMyPagePath = () => {
    if (user_id === profileData?.id) {
      return profileData?.role === 'student' ? '/my-page' : '/teacher/my-page';
    }
    return profileData?.role === 'student'
      ? `/my-page/${user_id}`
      : `/teacher/my-page/${user_id}`;
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleDeletePost = () => {
    if (user_id === profileData?.id) {
      const postToDelete = profileData.posts.find((post) => {
        return post.post_id === post_id;
      });

      if (postToDelete) {
        deletePostMutation(postToDelete.post_id);
        setIsMenuOpen(false);
        queryClient.setQueryData(['posts'], (oldData: any) => {
          // 기존 데이터에서 해당 게시물 삭제
          return {
            ...oldData,
            pages: oldData.pages.map((page: any) => ({
              ...page,
              posts: page.posts.filter((post: any) => post.post_id !== post_id),
            })),
          };
        });
      } else {
        console.log('일치하는 게시글을 찾을 수 없습니다');
      }
    }
  };

  return (
    <header className='flex h-[54px] items-center justify-between px-[9px] py-[8px]'>
      <div className='flex gap-2'>
        <Link to={getMyPagePath()}>
          <img
            src={profile_image || studentIcon1}
            onError={(e) => {
              e.currentTarget.src = studentIcon1;
            }}
            alt='studentProfileImage'
            className='h-[40px] w-[40px] rounded-full'
          />
        </Link>
        <ul className='flex h-full flex-col justify-between'>
          <li className='text-[20px] font-medium leading-none text-textMainColor'>
            {nickname}
          </li>
          <li className='text-[14px] font-medium leading-none text-hobbyText'>
            {career_aspiration}, {interest}
          </li>
        </ul>
      </div>
      {isOwnPost && (
        <div className='relative'>
          <motion.div
            className='flex w-6 cursor-pointer flex-col items-center justify-center gap-1'
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <span className='h-1 w-1 rounded-full bg-unFocusColor'></span>
            <span className='h-1 w-1 rounded-full bg-unFocusColor'></span>
            <span className='h-1 w-1 rounded-full bg-unFocusColor'></span>
          </motion.div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className='absolute right-0 top-[calc(100%+10px)] z-50 w-[150px] rounded-md bg-white shadow-lg'
              >
                <motion.button
                  whileHover={{ backgroundColor: '#f3f4f6' }}
                  whileTap={{ scale: 0.95 }}
                  className='block w-full rounded-t-md px-4 py-2 text-left text-sm text-gray-700'
                  onClick={() => console.log('수정하기')}
                >
                  수정하기
                </motion.button>
                <motion.button
                  whileHover={{ backgroundColor: '#f3f4f6' }}
                  whileTap={{ scale: 0.95 }}
                  className='block w-full rounded-b-md px-4 py-2 text-left text-sm text-deleteButtonColor'
                  onClick={handleDeletePost}
                >
                  삭제하기
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </header>
  );
};

export default FeedPostUserInfo;
