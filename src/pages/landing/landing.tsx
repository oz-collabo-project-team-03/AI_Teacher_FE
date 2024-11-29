import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import MainLanding from '@/components/landing/MainLanding';
import SubLanding from '@/components/landing/SubLanding';
import { useGestureControl } from '@/hooks/useGestureControl';

const Landing = () => {
  const [showSub, setShowSub] = useState(false);

  useGestureControl({
    onShowChange: setShowSub,
  });

  const handleClick = () => {
    setShowSub(true);
  };

  return (
    <div className='relative flex h-full w-full select-none items-center justify-center overflow-hidden'>
      <MainLanding onClick={handleClick} />
      <div
        className={twMerge(
          'absolute h-full w-full bg-white transition-transform duration-700 ease-in-out',
          showSub ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <SubLanding />
      </div>
    </div>
  );
};

export default Landing;
