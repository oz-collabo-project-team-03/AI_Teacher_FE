import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/sliderSlick.css';

import Slider from 'react-slick';
import img1 from '../../assets/slider/daily1.webp';
import img2 from '../../assets/slider/daily2.webp';
import img3 from '../../assets/slider/daily3.webp';

const FeedPostSlider = () => {
  const settings = {
    rows: 1,
    dots: true, // 하단 페이지네이션 점 표시
    infinite: false, // 무한반복 여부
    speed: 500, // 전환속도
    arrows: false,
    adaptiveHeight: false,
    slidesToShow: 1, // 기본적으로 화면에 보여줄 슬라이드 수
    centerMode: false, // 사진 옆에 다른 사진이 보이지 않게 함
    focusOnSelect: true, // 클릭 시 해당 사진에 포커스를 맞춤
    slidesToScroll: 1, // 한 번에 넘길 슬라이드 수
    responsive: [
      {
        breakpoint: 1024, // 화면 크기가 1024px 이상일 때
        settings: {
          slidesToShow: 1, // 화면에 1개씩 표시
        },
      },
      {
        breakpoint: 768, // 화면 크기가 768px 이상일 때
        settings: {
          slidesToShow: 1, // 화면에 1개씩 표시
        },
      },
    ],
  };

  return (
    <div className='h-[233px] w-full'>
      <Slider {...settings} className='w-full'>
        <div className='[210px] overflow-hidden'>
          <img
            src={img1}
            alt='daily사진'
            className='[210px] w-full object-cover'
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
