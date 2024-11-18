import { useState, useEffect } from 'react';

interface UseGestureControlProps {
  onShowChange: (show: boolean) => void;
}

export const useGestureControl = ({ onShowChange }: UseGestureControlProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        onShowChange(true);
      } else if (e.deltaY < 0) {
        onShowChange(false);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartY(e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaY = e.clientY - startY;
      if (deltaY < -50) {
        onShowChange(true);
        setIsDragging(false);
      } else if (deltaY > 50) {
        onShowChange(false);
        setIsDragging(false);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touchStartY = e.touches[0].clientY;

      const handleTouchMove = (e: TouchEvent) => {
        const touchEndY = e.touches[0].clientY;
        if (touchStartY > touchEndY) {
          onShowChange(true);
        } else if (touchStartY < touchEndY) {
          onShowChange(false);
        }
      };

      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener(
        'touchend',
        () => {
          document.removeEventListener('touchmove', handleTouchMove);
        },
        { once: true }
      );
    };

    document.addEventListener('wheel', handleScroll);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchstart', handleTouchStart);

    return () => {
      document.removeEventListener('wheel', handleScroll);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, [isDragging, startY, onShowChange]);
};
