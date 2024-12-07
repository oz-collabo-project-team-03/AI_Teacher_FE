import { twMerge } from 'tailwind-merge';
import { useEffect } from 'react';
import { getProfileImages } from '@/hooks/getProfileImages';

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
  const { images } = getProfileImages(userType, currentImageUrl, onImageSelect);

  useEffect(() => {
    if (currentImageUrl) {
      // URL에서 파일명 추출 (예: studentIcon3.jpeg -> studentIcon3)
      const currentFileName = currentImageUrl.split('/').pop()?.split('.')[0];

      // 파일명으로 매칭되는 이미지의 인덱스 찾기
      const currentIndex = images.findIndex((img) => {
        const importedFileName = img.split('/').pop()?.split('.')[0];
        return importedFileName === currentFileName;
      });

      if (currentIndex !== -1) {
        onImageSelect(currentIndex, images[currentIndex]);
      }
    } else {
      // 현재 이미지가 없을 경우 첫 번째 이미지 선택
      onImageSelect(0, images[0]);
    }
  }, [currentImageUrl, images]);

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
