import { useEffect, useRef } from 'react';

type Ball = {
  x: number; // x 좌표
  y: number; // y 좌표
  radius: number; // 반지름
  dx: number; // x축 이동 속도
  dy: number; // y축 이동 속도
  color: string; // 색상
};

type CenterBall = {
  x: number; // x 좌표
  y: number; // y 좌표
  radius: number; // 반지름
  angle: number; // 회전 각도
  distance: number; // 회전 반경
  color: string; // 색상
};

const BouncingBalls = () => {
  // canvas 요소 참조
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // 애니메이션 프레임 ID 저장
  const animationFrameId = useRef<number | null>(null);

  // 캔버스 크기 조정 함수
  const resizeCanvas = () => {
    if (!canvasRef.current) return;
    canvasRef.current.width = canvasRef.current.offsetWidth;
    canvasRef.current.height = canvasRef.current.offsetHeight;
  };

  // 메인 애니메이션 핸들러
  const setupCanvasAnimation = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // 애니메이션 실행
    animate(canvas, ctx);
  };

  // 컴포넌트 마운트/언마운트 처리
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    setupCanvasAnimation();

    // 클린업 함수
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className='h-full w-full' />;
};

export default BouncingBalls;

// 애니메이션 실행 함수
const animate = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  // 애니메이션 설정값
  const SPEED = 1.5;
  const INITIAL_ANGLE = Math.PI / 4;

  // 튕기는 공 초기화
  const ball: Ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 200,
    dx: SPEED * Math.cos(INITIAL_ANGLE),
    dy: SPEED * Math.sin(INITIAL_ANGLE),
    color: 'rgba(242,239,255, 0.8)',
  };

  // 중앙 회전 공 초기화
  const centerBall: CenterBall = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 200,
    angle: 0,
    distance: 20,
    color: 'rgba(123,120,227, 0.8)',
  };

  // 프레임마다 실행되는 애니메이션 함수
  const animateFrame = () => {
    // 캔버스 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 튕기는 공 그리기
    drawBall(ctx, ball);
    // 중앙 회전 공 그리기
    drawCenterBall(ctx, centerBall, canvas);

    // 공 위치 업데이트
    updateBallPosition(ball, canvas, SPEED, INITIAL_ANGLE);
    // 중앙 공 회전
    centerBall.angle += 0.002;

    // 다음 프레임 요청
    requestAnimationFrame(animateFrame);
  };

  animateFrame();
};

// 공 그리기 함수
const drawBall = (ctx: CanvasRenderingContext2D, ball: Ball) => {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
};

// 중앙 회전 공 그리기 함수
const drawCenterBall = (
  ctx: CanvasRenderingContext2D,
  centerBall: CenterBall,
  canvas: HTMLCanvasElement
) => {
  const centerX =
    canvas.width / 2 + 70 + Math.cos(centerBall.angle) * centerBall.distance;
  const centerY =
    canvas.height / 2 - 80 + Math.sin(centerBall.angle) * centerBall.distance;

  ctx.beginPath();
  ctx.arc(centerX, centerY, centerBall.radius, 0, Math.PI * 2);
  ctx.fillStyle = centerBall.color;
  ctx.fill();
  ctx.closePath();
};

// 공 위치 업데이트 함수
const updateBallPosition = (
  ball: Ball,
  canvas: HTMLCanvasElement,
  SPEED: number,
  INITIAL_ANGLE: number
) => {
  // 가로 방향 충돌 감지 및 처리
  if (
    ball.x + ball.radius > canvas.width + 100 ||
    ball.x - ball.radius < -100
  ) {
    ball.dx = -Math.sign(ball.dx) * SPEED * Math.cos(INITIAL_ANGLE);
    ball.x =
      ball.x + ball.radius > canvas.width + 100
        ? canvas.width + 100 - ball.radius
        : -100 + ball.radius;
  }

  // 세로 방향 충돌 감지 및 처리
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy = -Math.sign(ball.dy) * SPEED * Math.sin(INITIAL_ANGLE);
    ball.y =
      ball.y + ball.radius > canvas.height
        ? canvas.height - ball.radius
        : ball.radius;
  }

  // 공 위치 업데이트
  ball.x += ball.dx;
  ball.y += ball.dy;
};
