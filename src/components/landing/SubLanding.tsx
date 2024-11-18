import { Link } from 'react-router-dom';
import { iphone } from '../../assets/assets';

const SubLanding = () => {
  return (
    <div className='flex flex-col items-center gap-[50px] pt-[240px]'>
      <Link to='/login'>
        <span className='text-3xl font-bold text-mainLogoTextColor'>
          수행쌤 만나러 가기!
        </span>
      </Link>
      <img
        src={iphone}
        alt='아이폰 이미지'
        draggable='false'
        className='select-none'
      />
    </div>
  );
};

export default SubLanding;
