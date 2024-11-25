import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // framer-motion import 추가
import { iphone } from '@/assets/assets';

const SubLanding = () => {
  return (
    <div className='flex flex-col items-center gap-[50px] pt-[200px]'>
      <Link to='/login'>
        <span className='text-3xl font-bold text-mainLogoTextColor'>
          수행쌤 만나러 가기!
        </span>
      </Link>

      <motion.img
        src={iphone}
        alt='아이폰 이미지'
        draggable='false'
        className='w-[324px] select-none'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      />
    </div>
  );
};

export default SubLanding;
