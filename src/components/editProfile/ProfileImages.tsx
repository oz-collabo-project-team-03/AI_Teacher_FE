import { twMerge } from 'tailwind-merge';
import studentDefaultIcon from '../../assets/editProfile/student/studentDefaultIcon.png';
import studentIcon2 from '../../assets/editProfile/student/studentIcon2.png';
import studentIcon3 from '../../assets/editProfile/student/studentIcon3.png';
import studentIcon4 from '../../assets/editProfile/student/studentIcon4.png';
import studentIcon5 from '../../assets/editProfile/student/studentIcon5.png';
import studentIcon6 from '../../assets/editProfile/student/studentIcon6.png';
import studentIcon7 from '../../assets/editProfile/student/studentIcon7.png';
import studentIcon8 from '../../assets/editProfile/student/studentIcon8.png';
import studentIcon9 from '../../assets/editProfile/student/studentIcon9.png';
import studentIcon10 from '../../assets/editProfile/student/studentIcon10.png';
import studentIcon11 from '../../assets/editProfile/student/studentIcon11.png';
import studentIcon12 from '../../assets/editProfile/student/studentIcon12.png';
import teacherDefaultIcon from '../../assets/editProfile/teacher/teacherDefaultIcon.png';
import teacherIcon2 from '../../assets/editProfile/teacher/teacherIcon2.png';
import teacherIcon3 from '../../assets/editProfile/teacher/teacherIcon3.png';
import { useEffect } from 'react';

type ProfileImagesProps = {
  selectedIndex: number;
  onImageSelect: (index: number, imageUrl: string) => void;
  userType: 'student' | 'teacher';
  currentImageUrl: string;
};

export const profileImages = {
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
};

const ProfileImages = ({
  selectedIndex,
  onImageSelect,
  userType,
  currentImageUrl,
}: ProfileImagesProps) => {
  useEffect(() => {
    const currentIndex = profileImages[userType].findIndex(
      (img) => img === currentImageUrl
    );
    if (currentIndex !== -1) {
      onImageSelect(currentIndex, currentImageUrl);
    }
  }, []);

  return (
    <div className='flex max-w-[410px] flex-wrap justify-between gap-x-4 gap-y-5 self-center pb-9'>
      {profileImages[userType].map((img, index) => (
        <div
          key={index}
          className={twMerge(
            'flex h-[70px] w-[70px] items-center justify-center self-start rounded-full',
            selectedIndex === index && 'border-2 border-profileSelectColor'
          )}
        >
          <img
            src={img}
            alt={`${userType} 프로필 이미지${index + 1}`}
            className='h-[60px] w-[60px] rounded-full object-cover'
            onClick={() => onImageSelect(index, img)}
          />
        </div>
      ))}
    </div>
  );
};

export default ProfileImages;
