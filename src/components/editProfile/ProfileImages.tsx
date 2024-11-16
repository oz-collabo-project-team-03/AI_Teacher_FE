import { twMerge } from 'tailwind-merge';
import {
  stDefaultIcon,
  stIcon2,
  stIcon3,
  stIcon4,
  stIcon5,
  stIcon6,
  stIcon7,
  stIcon8,
  stIcon9,
  stIcon10,
  stIcon11,
  stIcon12,
  teDefaultIcon,
  teIcon2,
  teIcon3,
} from '../../assets/assets';

type ProfileImagesProps = {
  selectedIndex: number;
  onImageSelect: (index: number) => void;
  userType: 'student' | 'teacher';
};

const ProfileImages = ({
  selectedIndex,
  onImageSelect,
  userType,
}: ProfileImagesProps) => {
  const stImages = [
    stDefaultIcon,
    stIcon2,
    stIcon3,
    stIcon4,
    stIcon5,
    stIcon6,
    stIcon7,
    stIcon8,
    stIcon9,
    stIcon10,
    stIcon11,
    stIcon12,
  ];

  const teImages = [teDefaultIcon, teIcon2, teIcon3];

  const useImages = userType === 'student' ? stImages : teImages;

  return (
    <div className='flex max-w-[410px] flex-wrap justify-between gap-x-4 gap-y-5 self-center pb-9'>
      {useImages.map((img, index) => (
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
            onClick={() => onImageSelect(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default ProfileImages;
