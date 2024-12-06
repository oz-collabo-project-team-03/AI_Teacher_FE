import { editIcon, logoutIcon, toggleIcon } from '@/assets/assets';
import { useLogout } from '@/hooks/logout/useLogout';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ToggleButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const { logoutMutation } = useLogout();

  const containerVariants = {
    // 초기 상태: 컨테이너가 완전히 투명한 상태
    hidden: { opacity: 0 },

    // 보이는 상태: 컨테이너가 완전히 불투명해짐
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3, // 애니메이션 지속 시간: 0.3초
        when: 'beforeChildren', // 자식 요소들의 애니메이션 전에 실행
        staggerChildren: 0.1, // 자식 요소들 사이의 애니메이션 지연 시간: 0.1초
      },
    },

    // 사라지는 상태: 컨테이너가 다시 완전히 투명해짐
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3, // 애니메이션 지속 시간: 0.3초
        when: 'afterChildren', // 자식 요소들의 애니메이션 후에 실행
        staggerChildren: 0.1, // 자식 요소들 사이의 애니메이션 지연 시간: 0.1초
        staggerDirection: -1, // 자식 요소들의 애니메이션 순서를 역순으로 실행
      },
    },
  };

  const itemVariants = {
    // 초기 상태: 아이템이 왼쪽으로 25px 이동하고 완전히 투명한 상태
    hidden: { x: -25, opacity: 0 },

    // 보이는 상태: 아이템이 원래 위치로 이동하고 완전히 불투명해짐
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 }, // 애니메이션 지속 시간: 0.3초
    },

    // 사라지는 상태: 아이템이 다시 왼쪽으로 25px 이동하고 완전히 투명해짐
    exit: {
      x: -25,
      opacity: 0,
      transition: { duration: 0.3 }, // 애니메이션 지속 시간: 0.3초
    },
  };

  // 외부 클릭 감지를 위한 useEffect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='absolute bottom-0 right-0 flex items-center'>
      <div className='relative' ref={containerRef}>
        <div
          className='relative z-20 h-[25px] w-[25px] rounded-full shadow-ToggleButtonShadow'
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src={toggleIcon}
            alt='설정 아이콘'
            className='h-full w-full cursor-pointer'
          />
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={containerVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              className='absolute -top-2 left-full flex gap-[5px] p-2'
            >
              <motion.div
                variants={itemVariants}
                className='h-[25px] w-[25px] rounded-full shadow-ToggleButtonShadow'
              >
                <Link to='/edit-profile'>
                  <img
                    src={editIcon}
                    alt='프로필 수정 아이콘'
                    className='h-full w-full cursor-pointer'
                  />
                </Link>
              </motion.div>
              <motion.div
                variants={itemVariants}
                onClick={logoutMutation}
                className='h-[25px] w-[25px] rounded-full shadow-ToggleButtonShadow'
              >
                <img
                  src={logoutIcon}
                  alt='로그아웃 아이콘'
                  className='h-full w-full cursor-pointer'
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ToggleButton;
