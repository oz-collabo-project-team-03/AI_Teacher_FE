import { motion } from 'framer-motion';

const LoadingPage = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-white'>
      <motion.div
        className='flex space-x-2'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className='mb-4 h-4 w-4 rounded-full bg-primaryColor'
            animate={{
              y: ['0%', '-50%', '0%'],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          />
        ))}
      </motion.div>
      잠시만 기다려주세요
    </div>
  );
};

export default LoadingPage;
