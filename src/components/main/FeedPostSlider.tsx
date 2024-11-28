import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/sliderSlick.css';

import Slider from 'react-slick';

type FeedPostSliderProps = {
  image1: string;
  image2: string | null;
  image3: string | null;
};

const FeedPostSlider = ({ image1, image2, image3 }: FeedPostSliderProps) => {
  const settings = {
    dots: true, //하단 페이지네이션 점 표시
    infinite: false, // 무한반복 여부
    speed: 500, //전환속도
    arrows: false,
    slidesToShow: 1, //화면에 보여줄 슬라이드 수
    slidesToScroll: 1, //한번에 넘길 슬라드 수
  };

  const images = [image1, image2, image3].filter(
    (image): image is string => image !== null
  );

  return (
    <section className='h-[233px] w-full'>
      <Slider {...settings} className='w-full'>
        {images.map((image, index) => (
          <div
            key={`slide-${index}`}
            className='h-[210px] w-full overflow-hidden'
          >
            <img
              src={image}
              alt={`daily사진 ${index + 1}`}
              className='object-cover w-full h-full'
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default FeedPostSlider;
