import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import BouncingBalls from './BouncingBalls';

type MainLandingProps = {
  onClick: () => void;
};

const guideText = ['위로 슬라이드', '아래로 스크롤'];

const MainLanding = ({ onClick }: MainLandingProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  {
    /* //? 프레이머 모션 사용으로 변경
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

  <span
    className={twMerge(
      'absolute bottom-[30px] cursor-pointer text-center text-xl font-bold text-mainLogoTextColor transition-opacity duration-500',
      isBlinking || isFading ? 'opacity-0' : 'opacity-100'
    )}
    onClick={onClick}
  >
    {guideText[currentTextIndex]}
  </span>

  */
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % guideText.length);
    }, 7500);

    return () => clearInterval(timer);
  }, []);

  const textVariants = {
    // 컴포넌트가 처음 나타날 때의 초기 상태
    initial: {
      opacity: 0, // 완전히 투명한 상태
      y: -20, // 위로 20px 올라간 위치에서 시작
    },
    // 실제 화면에 보여질 때의 상태와 애니메이션
    animate: {
      opacity: 1, // 완전히 불투명한 상태
      y: 0, // 원래 위치로 이동
      transition: {
        duration: 0.5, // 0.5초 동안 애니메이션 실행
      },
    },
    // 깜빡임 애니메이션 설정
    blink: {
      opacity: [1, 0, 1, 0, 1], // 불투명 -> 투명을 반복하는 배열
      transition: {
        duration: 1.5, // 깜빡임 전체 지속 시간 1.5초
        times: [0, 0.2, 0.4, 0.7, 1], // 각 깜빡임이 실행될 시점 (0~1 사이의 값)
        delay: 5, // 5초 대기 후 깜빡임 시작
        ease: 'linear', // 일정한 속도로 애니메이션 실행
      },
    },
    // 컴포넌트가 사라질 때의 상태와 애니메이션
    exit: {
      opacity: 0, // 완전히 투명해짐
      y: 20, // 아래로 20px 내려가면서 사라짐
      transition: {
        duration: 0.5, // 사라지는 애니메이션 0.5초
        delay: 0.1, // 0.15초 대기 후 사라지기 시작
      },
    },
  };

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

      {/* 새로운 요소가 나타나기 전에 이전 요소의 종료 애니메이션이 완료될 때까지대기 */}
      <AnimatePresence mode='wait'>
        <motion.span
          key={currentTextIndex} // 텍스트가 변경될 때마다 새로운 애니메이션 실행을 위한 고유 키
          variants={textVariants} // 위에서 정의한 애니메이션 적용
          initial='initial' // 초기 상태 설정
          animate={['animate', 'blink']} // animate와 blink 애니메이션을 순차적으로 실행
          exit='exit' // 컴포넌트가 사라질 때의 애니메이션
          onClick={onClick}
          whileHover={{ scale: 1.1 }} // 마우스 호버 시 10% 확대
          whileTap={{ scale: 0.95 }} // 클릭 시 5% 축소
          className='absolute bottom-[50px] text-xl font-bold'
        >
          {guideText[currentTextIndex]}
        </motion.span>
      </AnimatePresence>
    </>
  );
};

export default MainLanding;
