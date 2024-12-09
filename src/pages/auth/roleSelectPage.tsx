import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

import roleStudentActive from '@/assets/roleSelect/role_student_active.svg';
import roleStudentUnActive from '@/assets/roleSelect/role_student_unactive.svg';
import roleTeacherActive from '@/assets/roleSelect/role_teacher_active.svg';
import roleTeacherUnActive from '@/assets/roleSelect/role_teacher_unactive.svg';
import Button from '@/components/common/Button';
import { useToast } from '@/hooks/useToast';
import { useTermsStore } from '@/stores/useTermsStore';

type TRole = 'student' | 'teacher' | null;

const RoleSelectPage = () => {
  const [hoveredRole, setHoveredRole] = useState<TRole>(null);
  const [selectedRole, setSelectedRole] = useState<TRole>(null);

  const isAllTermsAccepted = useTermsStore((state) => state.stack.isAllChecked);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const isFirstLogin =
    location.state?.isFirstLogin || location.search.includes('social=true');

  const handleRoleClick = (role: TRole) => {
    setSelectedRole(role);
  };

  const isRoleActive = (role: 'student' | 'teacher'): boolean => {
    return selectedRole === role || hoveredRole === role;
  };

  return (
    <div className='flex h-svh flex-col justify-center px-[28px] py-[30px]'>
      <div className='flex-grow'>
        <div className='pt-[89px]'>
          <h1 className='mb-1 font-gMarket text-[43px] text-mainLogoTextColor'>
            수행쌤
          </h1>
          <div className='mb-[50px] text-lg text-captionColor'>
            <p>회원가입을 원하는</p>
            <p>사용자 유형을 선택해주세요</p>
          </div>
          <div className='flex gap-2'>
            {(['student', 'teacher'] as const).map((role) => (
              <motion.div
                key={role}
                className={twMerge(
                  'flex w-full cursor-pointer flex-col justify-center gap-[22px] rounded-xl px-8 py-5 transition-all duration-300',
                  isRoleActive(role)
                    ? 'bg-primaryColor/15'
                    : 'bg-unFocusColor/20'
                )}
                onMouseEnter={() => setHoveredRole(role)}
                onMouseLeave={() => setHoveredRole(null)}
                onClick={() => handleRoleClick(role)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={
                    isRoleActive(role)
                      ? role === 'student'
                        ? roleStudentActive
                        : roleTeacherActive
                      : role === 'student'
                        ? roleStudentUnActive
                        : roleTeacherUnActive
                  }
                  alt={role === 'student' ? '학생 회원' : '선생님 회원'}
                />
                <Button
                  variant={isRoleActive(role) ? 'active' : 'cancel'}
                  className={twMerge(
                    'font-semibold',
                    isRoleActive(role)
                      ? 'bg-primaryHoverColor text-white'
                      : 'hover:bg-primaryHoverColor'
                  )}
                  // 버튼에도 호버 상태 전달
                  onMouseEnter={() => setHoveredRole(role)}
                  onMouseLeave={() => setHoveredRole(null)}
                >
                  {role === 'student' ? '학생 회원' : '교사 회원'}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Button
        variant='active'
        className='mt-auto'
        onClick={() => {
          if (!isAllTermsAccepted) {
            showToast('이용약관 동의 후 진행해주세요');
            navigate('/member-agree');
            return;
          }

          if (!selectedRole) {
            showToast('역할을 선택해주세요');
          } else {
            const navigationPath = isFirstLogin
              ? `/signup/${selectedRole}?social=true`
              : `/signup/${selectedRole}`;
            navigate(navigationPath);
          }
        }}
      >
        다음
      </Button>
    </div>
  );
};

export default RoleSelectPage;
