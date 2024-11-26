import { twMerge } from 'tailwind-merge';
import { useEffect } from 'react';
import { useProfileImages } from '@/hooks/useProfileImages';

type ProfileImagesProps = {
  selectedIndex: number;
  onImageSelect: (index: number, imageUrl: string) => void;
  userType: 'student' | 'teacher';
  currentImageUrl: string;
};

const ProfileImages = ({
  selectedIndex,
  onImageSelect,
  userType,
  currentImageUrl,
}: ProfileImagesProps) => {
  const { images } = useProfileImages(userType, currentImageUrl, onImageSelect);

  useEffect(() => {
    if (currentImageUrl) {
      const currentIndex = images.findIndex((img) => img === currentImageUrl);
      if (currentIndex !== -1) {
        onImageSelect(currentIndex, currentImageUrl);
      }
    }
  }, [currentImageUrl]);

  return (
    <div className='flex max-w-[410px] flex-wrap justify-between gap-x-4 gap-y-5 self-center pb-9'>
      {images.map((img, index) => (
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
