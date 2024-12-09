import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

type GradeButtonProps = {
  grade: number;
  isSelected: boolean;
  onClick: () => void;
};

type GradeSelectorProps = {
  selectedGrade: number;
  setSelectedGrade: (grade: number) => void;
};

const GradeButton = ({ grade, isSelected, onClick }: GradeButtonProps) => (
  <motion.button
    className={twMerge(
      'relative overflow-hidden rounded-[10px] px-[34px] py-2',
      isSelected ? 'text-textMainColor' : 'text-textMainColor/70'
    )}
    type='button'
    whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05 }}
    onClick={onClick}
  >
    {isSelected && (
      <motion.span
        layoutId='grade-highlight'
        className='absolute inset-0 -z-10 rounded-[10px] bg-white'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      />
    )}
    {grade}학년
  </motion.button>
);

export const GradeSelector = ({
  selectedGrade,
  setSelectedGrade,
}: GradeSelectorProps) => (
  <div className='relative h-12 w-full rounded-[10px] bg-unFocusColor/50 p-1'>
    <AnimatePresence>
      <motion.div
        layoutId='grade-highlight'
        className='absolute bottom-1 top-1 rounded-[10px] bg-white'
        initial={{
          x: (selectedGrade - 1) * 138 + 3,
          width: 80,
          opacity: 0.7,
        }}
        animate={{
          x: (selectedGrade - 1) * 138 + 3,
          width: 80,
          opacity: 1,
        }}
        exit={{
          opacity: 0,
          transition: { duration: 0.2 },
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 200,
          bounce: 0.2,
        }}
      />
    </AnimatePresence>
    <div className='relative z-10 flex justify-between px-2'>
      {[1, 2, 3].map((grade) => (
        <GradeButton
          key={grade}
          grade={grade}
          isSelected={selectedGrade === grade}
          onClick={() => setSelectedGrade(grade)}
        />
      ))}
    </div>
  </div>
);
