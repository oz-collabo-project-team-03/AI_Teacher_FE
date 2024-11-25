import { useRef, useState } from 'react';

import deleteIcon from '../../assets/posting/deleteIcon.svg';
import photo from '../../assets/posting/photo.svg';

function PostImageUpload() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<string[]>([]);

  //버튼하고 input연결
  const handleButtonClick = () => {
    if (images.length < 3) {
      fileInputRef.current?.click();
    }
  };

  //프리뷰용 Data URL 형식변환 (Base64) 방식추후상의필요
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (images.length < 3) {
          setImages((prevImages) => [...prevImages, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지 삭제
  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className='my-[12px] flex h-[151px] w-full flex-col gap-1.5 px-[16px] py-[19px]'>
      <p className='text-[14px] text-captionColor'>
        사진 파일만 선택해 주세요. (지원 형식: JPG, JPEG, PNG)
      </p>
      <div className='flex gap-2.5'>
        <button
          className='flex h-[90px] w-[90px] cursor-pointer flex-col items-center justify-center rounded-[10px] border border-postTextBorderColor'
          onClick={handleButtonClick}
        >
          <img
            src={photo}
            alt='default-photo-icon'
            className='object-cover object-center' // 기본 사진 아이콘
          />
          <p className='right-[5px] top-[5px] mt-[5px] text-[12px] font-bold text-hobbyText'>
            <span className='text-profilePointTextColor'>{images.length}</span>
            /3
          </p>
        </button>
        {images.map((image, index) => (
          <div
            key={image}
            className='relative box-border flex h-[90px] w-[90px] items-center justify-center overflow-hidden rounded-[10px] border border-postTextBorderColor'
          >
            <img
              src={image}
              alt={`photo icon ${index}`}
              className='object-cover object-center'
            />
            <button
              onClick={() => handleDeleteImage(index)}
              className='absolute right-[5px] top-[5px]'
            >
              <img
                src={deleteIcon}
                alt='delete-icon'
                className='h-[17px] w-[17px]'
              />
            </button>
          </div>
        ))}
      </div>
      <input
        ref={fileInputRef}
        type='file'
        className='hidden'
        accept='image/jpeg, image/png, image/jpg'
        onChange={handleImageUpload}
      />
    </div>
  );
}

export default PostImageUpload;
