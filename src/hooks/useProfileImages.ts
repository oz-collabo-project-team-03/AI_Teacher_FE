import studentDefaultIcon from '@/assets/editProfile/student/studentDefaultIcon.png';
import studentIcon2 from '@/assets/editProfile/student/studentIcon2.png';
import studentIcon3 from '@/assets/editProfile/student/studentIcon3.png';
import studentIcon4 from '@/assets/editProfile/student/studentIcon4.png';
import studentIcon5 from '@/assets/editProfile/student/studentIcon5.png';
import studentIcon6 from '@/assets/editProfile/student/studentIcon6.png';
import studentIcon7 from '@/assets/editProfile/student/studentIcon7.png';
import studentIcon8 from '@/assets/editProfile/student/studentIcon8.png';
import studentIcon9 from '@/assets/editProfile/student/studentIcon9.png';
import studentIcon10 from '@/assets/editProfile/student/studentIcon10.png';
import studentIcon11 from '@/assets/editProfile/student/studentIcon11.png';
import studentIcon12 from '@/assets/editProfile/student/studentIcon12.png';
import teacherDefaultIcon from '@/assets/editProfile/teacher/teacherDefaultIcon.png';
import teacherIcon2 from '@/assets/editProfile/teacher/teacherIcon2.png';
import teacherIcon3 from '@/assets/editProfile/teacher/teacherIcon3.png';

type UserType = 'student' | 'teacher';

const images = {
  student: [
    studentDefaultIcon,
    studentIcon2,
    studentIcon3,
    studentIcon4,
    studentIcon5,
    studentIcon6,
    studentIcon7,
    studentIcon8,
    studentIcon9,
    studentIcon10,
    studentIcon11,
    studentIcon12,
  ],
  teacher: [teacherDefaultIcon, teacherIcon2, teacherIcon3],
} as const;

export const useProfileImages = (
  userType: UserType,
  currentImageUrl: string,
  onImageSelect: (index: number, imageUrl: string) => void
) => {
  if (currentImageUrl && !images[userType].includes(currentImageUrl)) {
    const defaultIndex = 0;
    onImageSelect(defaultIndex, images[userType][defaultIndex]);
  }

  return {
    images: images[userType],
  };
};
