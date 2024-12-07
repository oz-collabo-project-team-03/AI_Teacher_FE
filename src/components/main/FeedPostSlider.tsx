import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/styles/sliderSlick.css';

import Slider from 'react-slick';

type FeedPostSliderProps = {
  image1: string;
  image2: string | null;
  image3: string | null;
};

const FeedPostSlider = ({ image1, image2, image3 }: FeedPostSliderProps) => {
  const images = [image1, image2, image3].filter((image) => image !== null);

  // 모든 이미지가 null인 경우
  if (images.length === 0) {
    return (
      <section className='h-[300px] w-full'>
        <div className='flex h-[280px] w-full items-center justify-center border-y bg-gray-50/50'>
          <p className='text-captionColor'>이미지 오류</p>
        </div>
      </section>
    );
  }

  // 이미지가 하나만 있는 경우
  if (images.length === 1) {
    return (
      <section className='h-[300px] w-full'>
        <div className='h-[280px] w-full overflow-hidden border-y bg-gray-50/50'>
          <img
            src={images[0]}
            alt='daily사진 1'
            className='h-full w-full object-contain'
          />
        </div>
      </section>
    );
  }

  // 이미지가 여러 개인 경우 슬라이더 사용
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className='h-[300px] w-full'>
      <Slider {...settings} className='h-full w-full'>
        {images.map((image, index) => (
          <div
            key={`slide-${index}`}
            className='h-[280px] w-full overflow-hidden border-y bg-gray-50/50 outline-none'
          >
            <img
              src={image}
              alt={`daily사진 ${index + 1}`}
              className='h-full w-full object-contain'
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default FeedPostSlider;
