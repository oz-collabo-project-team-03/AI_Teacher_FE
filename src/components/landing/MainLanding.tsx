import { useEffect, useState } from 'react';
import BouncingBalls from './BouncingBalls';
import { twMerge } from 'tailwind-merge';

type MainLandingProps = {
  onClick: () => void;
};

const MainLanding = ({ onClick }: MainLandingProps) => {
  const guideText = ['위로 슬라이드', '아래로 스크롤'];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 컴포넌트 언마운트 시 안전하게 애니메이션 정리
    let isAnimationActive = true;

    const blink = async () => {
      for (let i = 0; i < 3; i++) {
        if (!isAnimationActive) return;

        setIsBlinking(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (!isAnimationActive) return;

        setIsBlinking(false);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    };

    const changeText = async () => {
      while (isAnimationActive) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        if (!isAnimationActive) return;

        await blink();
        if (!isAnimationActive) return;

        setIsFading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (!isAnimationActive) return;

        setCurrentTextIndex((prev) => (prev + 1) % guideText.length);

        await new Promise((resolve) => setTimeout(resolve, 100));
        if (!isAnimationActive) return;
        setIsFading(false);
      }
    };

    changeText();

    return () => {
      isAnimationActive = false;
      setIsBlinking(false);
      setIsFading(false);
    };
  }, []);

  return (
    <>
      <ul className='absolute top-1/3 flex flex-col items-center gap-1'>
        <li className='text-sm font-medium text-white'>
          학생 맞춤형 보고서 AI 선생님
        </li>
        <li className='font-gMarket text-6xl text-white drop-shadow-lg'>
          수행쌤
        </li>
      </ul>

      <BouncingBalls />
      <span
        className={twMerge(
          'absolute bottom-[30px] cursor-pointer text-center text-xl font-bold text-mainLogoTextColor transition-opacity duration-500',
          isBlinking || isFading ? 'opacity-0' : 'opacity-100'
        )}
        onClick={onClick}
      >
        {guideText[currentTextIndex]}
      </span>
    </>
  );
};

export default MainLanding;
