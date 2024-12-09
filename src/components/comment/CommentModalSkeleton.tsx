import { motion } from 'framer-motion';

const CommentModalSkeleton = () => {
  const commentSkeletonVariants = {
    initial: { opacity: 0.6 },
    animate: {
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section className='flex h-[70vh] flex-col'>
      {/* Comments Skeleton */}
      <section className='custom-scrollbar flex-1 overflow-y-auto'>
        {[1, 2, 3].map((item) => (
          <motion.div
            key={item}
            variants={commentSkeletonVariants}
            initial='initial'
            animate='animate'
            className='mb-4 flex items-start gap-3'
          >
            <motion.div className='h-[35px] w-[35px] rounded-full bg-gray-200'></motion.div>
            <div className='flex-1'>
              <motion.div className='mb-2 h-[20px] w-[100px] rounded bg-gray-200'></motion.div>
              <motion.div className='h-[40px] w-full rounded bg-gray-200'></motion.div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Input Skeleton */}
      {/* <motion.form
        variants={skeletonVariants}
        initial='initial'
        animate='animate'
        className='bottom-0 flex items-center gap-3 border-t border-chatListHoverColor px-[17px] py-[16px]'
      >
        <motion.div className='h-[35px] w-[35px] rounded-full bg-gray-200'></motion.div>
        <div className='relative flex w-full items-center rounded-[15px] bg-commuInputColor p-[14px]'>
          <motion.div className='h-[30px] w-[90%] rounded bg-gray-200'></motion.div>
          <motion.div className='absolute right-1 h-[30px] w-[30px] rounded bg-gray-200'></motion.div>
        </div>
      </motion.form> */}
    </section>
  );
};

export default CommentModalSkeleton;
