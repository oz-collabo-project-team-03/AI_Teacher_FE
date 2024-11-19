import React from 'react';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';

const canvasStyles: React.CSSProperties = {
  position: 'fixed',
  width: '100%', // 전체 화면을 사용할 수 있도록 수정
  height: '100%', // 전체 화면을 사용할 수 있도록 수정
  top: 0,
  left: 0,
  zIndex: 3,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ConfettiCelebration = (originalOptions: any) => {
  return {
    ...originalOptions,
    particleCount: 100, // 조각 개수 설정
    spread: 160, // 퍼짐 정도 설정
    startVelocity: 50, // 초기 속도 설정
    ticks: 200, // 애니메이션 지속 시간 설정
    origin: { x: 0.5, y: 0.7 }, // 발사 위치 설정
    shapes: ['circle', 'circle', 'square'], // 이미지 배열을 shapes로 설정
    gravity: 2, // 중력 설정
  };
};

const Celebration = () => {
  return (
    <Fireworks
      autorun={{ speed: 0.5, duration: 3 }} // 자동 실행 설정
      style={canvasStyles}
      decorateOptions={ConfettiCelebration} // 함수 실행
    />
  );
};

export default Celebration;
