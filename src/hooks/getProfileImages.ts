import studentIcon1 from '@/assets/editProfile/student/studentIcon1.png';
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
import teacherIcon1 from '@/assets/editProfile/teacher/teacherIcon1.png';
import teacherIcon2 from '@/assets/editProfile/teacher/teacherIcon2.png';
import teacherIcon3 from '@/assets/editProfile/teacher/teacherIcon3.png';

type UserType = 'student' | 'teacher';

const images = {
  student: [
    studentIcon1,
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
  teacher: [teacherIcon1, teacherIcon2, teacherIcon3],
};

export const getProfileImages = (
  userType: UserType,
  currentImageUrl: string,
  onImageSelect: (index: number, imageUrl: string) => void
) => {
  // URL에서 파일명 추출 (예: studentIcon3.jpeg -> studentIcon3)
  const currentFileName = currentImageUrl.split('/').pop()?.split('.')[0];

  // 현재 이미지가 존재하고, 해당 파일명을 포함하는 이미지가 없는 경우
  const imageExists = images[userType].some((imgPath) => {
    const importedFileName = imgPath.split('/').pop()?.split('.')[0];
    return importedFileName === currentFileName;
  });

  if (currentImageUrl && !imageExists) {
    const defaultIndex = 0;
    onImageSelect(defaultIndex, images[userType][defaultIndex]);
  }

  return {
    images: images[userType],
  };
};
