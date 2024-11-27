import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/sliderSlick.css';

import Slider from 'react-slick';
import img1 from '../../assets/slider/daily1.webp';
import img2 from '../../assets/slider/daily2.webp';
import img3 from '../../assets/slider/daily3.webp';

const FeedPostSlider = () => {
  const settings = {
    dots: true, //하단 페이지네이션 점 표시
    infinite: false, // 무한반복 여부
    speed: 500, //전환속도
    arrows: false,
    slidesToShow: 1, //화면에 보여줄 슬라이드 수
    slidesToScroll: 1, //한번에 넘길 슬라드 수
  };

  return (
    <div className='h-[233px] w-full'>
      <Slider {...settings} className='w-full'>
        <div className='h-[210px] w-full overflow-hidden'>
          <img
            src={img1}
            alt='daily사진'
            className='h-full w-full object-cover'
          />
        </div>
        <div className='aspect-[16/8] w-full overflow-hidden'>
          <img
            src={img2}
            alt='daily사진'
            className='h-full w-full object-cover'
          />
        </div>
        <div className='aspect-[16/8] w-full overflow-hidden'>
          <img
            src={img3}
            alt='daily사진'
            className='h-full w-full object-cover'
          />
        </div>
      </Slider>
    </div>
  );
};

export default FeedPostSlider;
