import { teacherQueries } from '@/api/teacher/teacherQueries';

import { useTeacherSelection } from '@/hooks/teacherSelection/useTeacherSelection';
import ErrorPage from '@/pages/status/errorPage';
import LoadingPage from '@/pages/status/loadingPage';
import { TeacherDto } from '@/types/teacherType';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '../common/Button';
import Input from '../common/Input';

type CloseTeacherModalProps = {
  closeTeacherModal: () => void;
};

const TeacherListModal = ({ closeTeacherModal }: CloseTeacherModalProps) => {
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherDto | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState('');

  const { selectTeacherMutation } = useTeacherSelection();

  //전체 선생님 조회
  const {
    data: teachers = [],
    isLoading,
    error,
  } = useQuery({ ...teacherQueries.teachers.all() });

  // 검색어를 기반으로 선생님 목록 필터링
  const filteredTeachers = useMemo(() => {
    if (!searchTerm) return teachers;

    return teachers.filter((teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [teachers, searchTerm]);

  const handleTeacherSelect = (teacher: TeacherDto) => {
    setSelectedTeacher(teacher);
  };

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage />;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='absolute inset-0 z-50 flex items-center justify-center bg-black/50'
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
          className='h-auto w-full max-w-[390px] rounded-[16px] bg-white p-4'
        >
          <div className='mb-[21px] text-center text-[18px] font-medium'>
            담당 선생님을 선택해주세요.
          </div>
          <div className='mb-[12px] flex flex-col gap-y-3'>
            <div>
              <Input
                type='text'
                placeholder='찾고자 하는 선생님 이름을 입력해주세요'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <ul className='custom-scrollbar flex h-52 flex-col overflow-y-scroll'>
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher) => (
                  <motion.li
                    key={teacher.teacher_id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => handleTeacherSelect(teacher)}
                    className={twMerge(
                      'flex cursor-pointer justify-between px-2 py-4 hover:bg-chatListHoverColor',
                      selectedTeacher?.teacher_id === teacher.teacher_id
                        ? 'bg-chatListHoverColor'
                        : ''
                    )}
                  >
                    <div className='flex w-full items-center justify-between'>
                      <p>{teacher.name}</p>
                      <div className='flex space-x-2 text-cancelButtonColor'>
                        <p>{teacher.organization_name}</p>
                        <span>{teacher.organization_type}</span>
                        <span>{teacher.position}</span>
                      </div>
                    </div>
                  </motion.li>
                ))
              ) : (
                <li className='py-4 text-center'>선생님 정보가 없습니다.</li>
              )}
            </ul>
          </div>
          <Button
            disabled={!selectedTeacher}
            onClick={() => {
              if (selectedTeacher) {
                selectTeacherMutation(
                  selectedTeacher.name,
                  selectedTeacher.teacher_id
                );
                closeTeacherModal();
              }
            }}
          >
            확인
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
export default TeacherListModal;
