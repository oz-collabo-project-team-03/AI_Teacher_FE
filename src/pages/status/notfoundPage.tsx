import notFoundIcon from '@/assets/notfound/notfound.svg';
import { motion } from 'framer-motion';

const NotfoundPage = () => {
  return (
    <div className='flex h-svh items-center justify-center bg-gray-50'>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
        }}
        className='flex max-w-md flex-col items-center px-6 text-center'
      >
        <motion.img
          src={notFoundIcon}
          alt='Not Found'
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className='mb-6 h-48 w-48'
        />

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className='mb-4 text-7xl font-bold text-captionColor'
        >
          404
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className='mb-4 text-xl font-medium text-repleText'
        >
          페이지를 찾을 수 없습니다
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className='mb-6 max-w-xs whitespace-pre text-center text-hobbyText'
        >
          요청하신 페이지가 존재하지 않거나 삭제되었습니다.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='rounded-full bg-primaryColor px-6 py-2 text-white transition-colors hover:bg-primaryHoverColor'
          onClick={() => window.history.back()}
        >
          이전 페이지로 돌아가기
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotfoundPage;
