import { useEffect, useState } from 'react';

const useCountdown = (initialValue: number) => {
  const [countdown, setCountdown] = useState(initialValue);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, countdown]);

  const start = () => {
    setCountdown(initialValue);
    setIsActive(true);
  };

  const stop = () => {
    setIsActive(false);
  };

  const reset = () => {
    setCountdown(initialValue);
    setIsActive(false);
  };

  const formatTime = () => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return { countdown, isActive, start, stop, reset, formatTime };
};

export default useCountdown;
