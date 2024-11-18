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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) return;

    // 캔버스 크기를 화면 크기에 맞게 조정
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 공 속도 / 시작 각도 성정
    const SPEED = 1.5;
    const INITIAL_ANGLE = Math.PI / 4;

    // 튕기는 공 설정
    const ball: Ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 200,
      dx: SPEED * Math.cos(INITIAL_ANGLE),
      dy: SPEED * Math.sin(INITIAL_ANGLE),
      color: 'rgba(242,239,255, 0.8)',
    };

    // 중앙에서 회전하는 공 설정
    const centerBall: CenterBall = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 200,
      angle: 0,
      distance: 20,
      color: 'rgba(123,120,227, 0.8)',
    };

    let animationFrameId: number;

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // 중앙 회전하는 공 위치 지정
      const centerX =
        canvas!.width / 2 +
        70 +
        Math.cos(centerBall.angle) * centerBall.distance;
      const centerY =
        canvas!.height / 2 -
        80 +
        Math.sin(centerBall.angle) * centerBall.distance;

      // 원형 회전하는 공 화면에 그리기
      ctx!.beginPath();
      ctx!.arc(centerX, centerY, centerBall.radius, 0, Math.PI * 2);
      ctx!.fillStyle = centerBall.color;
      ctx!.fill();
      ctx!.closePath();

      // 튕기는 공 화면에 그리기
      ctx!.beginPath();
      ctx!.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx!.fillStyle = ball.color;
      ctx!.fill();
      ctx!.closePath();

      // 튕기는 공 벽 충돌 감지 정도 및 방향 전환 설정
      // 가로 방향
      if (
        ball.x + ball.radius > canvas!.width + 100 ||
        ball.x - ball.radius < -100
      ) {
        // x 방향 속도 반전 및 속도 고정
        ball.dx = -Math.sign(ball.dx) * SPEED * Math.cos(INITIAL_ANGLE);

        // 충돌 경계 보정
        if (ball.x + ball.radius > canvas!.width + 100) {
          ball.x = canvas!.width + 100 - ball.radius;
        }
        if (ball.x - ball.radius < -100) {
          ball.x = -100 + ball.radius;
        }
      }

      // 세로 방향
      if (ball.y + ball.radius > canvas!.height || ball.y - ball.radius < 0) {
        ball.dy = -Math.sign(ball.dy) * SPEED * Math.sin(INITIAL_ANGLE);

        if (ball.y + ball.radius > canvas!.height) {
          ball.y = canvas!.height - ball.radius;
        }
        if (ball.y - ball.radius < 0) {
          ball.y = ball.radius;
        }
      }

      // 공 위치 업데이트
      ball.x += ball.dx;
      ball.y += ball.dy;

      // 중앙 공 회전 속도
      centerBall.angle += 0.002;

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className='h-full w-full' />;
};

export default BouncingBalls;
