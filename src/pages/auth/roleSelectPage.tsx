import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import roleStudentActive from '@/assets/roleSelect/role_student_active.svg';
import roleStudentUnActive from '@/assets/roleSelect/role_student_unactive.svg';
import roleTeacherActive from '@/assets/roleSelect/role_teacher_active.svg';
import roleTeacherUnActive from '@/assets/roleSelect/role_teacher_unactive.svg';
import Button from '@/components/common/Button';
import { useToast } from '@/hooks/useToast';
import { useTermsStore } from '@/stores/useTermsStore';

type TRole = 'student' | 'teacher' | null;

const RoleSelectPage = () => {
  const [isStudentHovered, setIsStudentHovered] = useState(false);
  const [isTeacherHovered, setIsTeacherHovered] = useState(false);
  const [selectedRole, setSelectedRole] = useState<TRole>(null);

  const isAllTermsAccepted = useTermsStore(
    (state) => state.stack.isAllTermsAccepted
  );
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleRoleClick = (role: TRole) => {
    setSelectedRole(role);
  };

  // 역할이 선택되었는지 확인하는 함수
  const isRoleSelected = (role: 'student' | 'teacher'): boolean => {
    return selectedRole === role;
  };

  // 역할에 마우스가 호버되었는지 확인하는 함수
  const isRoleHovered = (role: 'student' | 'teacher'): boolean => {
    return role === 'student' ? isStudentHovered : isTeacherHovered;
  };

  // 역할이 활성화되었는지 확인하는 함수 (선택 또는 호버)
  const isRoleActive = (role: 'student' | 'teacher'): boolean => {
    return isRoleSelected(role) || isRoleHovered(role);
  };

  const handleProceed = () => {
    if (!isAllTermsAccepted) {
      showToast('이용약관 동의 후 진행해주세요');
      navigate('/member-agree');
      return;
    }

    if (!selectedRole) {
      showToast('역할을 선택해주세요');
    } else {
      navigate(`/signup/${selectedRole}`);
    }
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
            <div
              className={twMerge(
                'flex w-full cursor-pointer flex-col justify-center gap-[22px] rounded-xl px-8 py-5',
                isRoleActive('student')
                  ? 'bg-primaryColor/15'
                  : 'bg-unFocusColor/20'
              )}
              onMouseEnter={() => setIsStudentHovered(true)}
              onMouseLeave={() => setIsStudentHovered(false)}
              onClick={() => handleRoleClick('student')}
            >
              <img
                src={
                  isRoleActive('student')
                    ? roleStudentActive
                    : roleStudentUnActive
                }
                alt='학생 회원'
              />
              <Button
                variant='cancel'
                className={twMerge(
                  'font-semibold',
                  isRoleActive('student')
                    ? 'bg-primaryHoverColor'
                    : 'hover:bg-primaryHoverColor'
                )}
              >
                학생 회원
              </Button>
            </div>
            <div
              className={twMerge(
                'flex w-full cursor-pointer flex-col justify-center gap-[22px] rounded-xl px-8 py-5',
                isRoleActive('teacher')
                  ? 'bg-primaryColor/15'
                  : 'bg-unFocusColor/20'
              )}
              onMouseEnter={() => setIsTeacherHovered(true)}
              onMouseLeave={() => setIsTeacherHovered(false)}
              onClick={() => handleRoleClick('teacher')}
            >
              <img
                src={
                  isRoleActive('teacher')
                    ? roleTeacherActive
                    : roleTeacherUnActive
                }
                alt='선생님 회원'
              />
              <Button
                variant='cancel'
                className={twMerge(
                  'font-semibold',
                  isRoleActive('teacher')
                    ? 'bg-primaryHoverColor'
                    : 'hover:bg-primaryHoverColor'
                )}
              >
                교사 회원
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Button variant='active' className='mt-auto' onClick={handleProceed}>
        다음
      </Button>
    </div>
  );
};

export default RoleSelectPage;
