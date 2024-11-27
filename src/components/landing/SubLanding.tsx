import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { iphone, bottomArrow } from '@/assets/assets';

const SubLanding = () => {
  const phoneVariants = {
    animate: {
      scale: [1.03, 1.07, 1.03],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop' as const,
        ease: 'easeInOut',
        times: [0, 0.5, 1],
      },
    },
  };

  return (
    <div className='flex flex-col items-center gap-[20px] pt-[150px]'>
      <Link to='/login'>
        <span className='text-2xl font-bold text-mainLogoTextColor'>
          나만의 수행쌤 만나러 가기!
        </span>
      </Link>

      <img src={bottomArrow} alt='아래 화살표' className='pb-[25px]' />

      <Link to='/login'>
        <motion.img
          src={iphone}
          alt='아이폰 이미지'
          draggable='false'
          className='w-[324px] select-none'
          animate='animate'
          variants={phoneVariants}
        />
      </Link>
    </div>
  );
};

export default SubLanding;
