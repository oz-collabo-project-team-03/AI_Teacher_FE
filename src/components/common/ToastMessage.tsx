import { useEffect, useState } from 'react';

type ToastProps = {
  message: string;
  duration?: number;
  onClose?: () => void;
};

const ToastMessage = ({ message, duration = 3000, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-32 left-1/2 z-50 -translate-x-1/2 transition-[visibility,opacity] duration-200 ${isVisible ? 'visible opacity-100' : 'invisible opacity-0'}`}
    >
      <div className='rounded bg-commuBgColor px-[14px] py-1 text-sm text-textMainColor'>
        {message}
      </div>
    </div>
  );
};

export default ToastMessage;
