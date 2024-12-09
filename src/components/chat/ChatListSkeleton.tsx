import { motion } from 'framer-motion';
const SkeletonChatItem = () => (
  <div className='flex items-center space-x-4 p-4'>
    <div className='h-10 w-10 animate-pulse rounded-full bg-gray-300'></div>
    <div className='flex-grow space-y-2'>
      <div className='h-4 w-3/4 animate-pulse rounded bg-gray-300'></div>
      <div className='h-3 w-1/2 animate-pulse rounded bg-gray-300'></div>
    </div>
    <div className='h-3 w-12 animate-pulse rounded bg-gray-300'></div>
  </div>
);

const ChatListSkeleton = () => {
  return (
    <div className='flex h-full flex-col'>
      <div className='custom-scrollbar flex-grow overflow-y-auto overflow-x-hidden'>
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className='relative w-full'
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <SkeletonChatItem />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ChatListSkeleton;
