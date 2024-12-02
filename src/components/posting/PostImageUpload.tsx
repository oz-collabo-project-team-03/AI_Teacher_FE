import deleteIcon from '../../assets/posting/deleteIcon.svg';
import photo from '../../assets/posting/photo.svg';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { useToast } from '@/hooks/useToast';

const PostImageUpload = () => {
  const { setValue, getValues } = useFormContext();
  const [images, setImages] = useState<string[]>(getValues('images') || []);
  const { showToast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const newImages = fileArray.map((file) => URL.createObjectURL(file));

    if (images.length + newImages.length > 3) {
      showToast('사진은 최대 3개까지 업로드 가능합니다.');
      return;
    }
    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
    setValue('images', updatedImages);
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    setValue('images', updatedImages);
  };

  return (
    <div className='my-[12px] flex h-[151px] w-full flex-col gap-2 px-[16px] py-[19px]'>
      <p className='text-[14px] text-captionColor'>
        사진 파일만 선택해 주세요. (지원 형식: JPG, JPEG, PNG)
      </p>
      <div className='flex gap-2'>
        <label className='relative flex h-[92px] w-[92px] flex-col items-center justify-center rounded-md border'>
          <img
            src={photo}
            alt='upload-placeholder'
            className='h-[30px] w-[30px]'
          />
          <p className='right-[5px] top-[5px] mt-[5px] text-[12px] font-bold text-hobbyText'>
            <span className='text-profilePointTextColor'>{images.length}</span>
            /3
          </p>
          <input
            type='file'
            className='hidden'
            accept='image/jpeg, image/png, image/jpg'
            multiple
            onChange={handleFileSelect}
          />
        </label>

        {images.map((image, index) => (
          <div
            key={index}
            className='relative flex h-[92px] w-[92px] items-center justify-center rounded-md border'
          >
            <img
              src={image}
              alt='uploaded-thumbnail'
              className='h-full w-full rounded-md object-cover'
            />
            <button
              type='button'
              className='absolute right-1 top-1'
              onClick={() => handleDeleteImage(index)}
            >
              <img src={deleteIcon} alt='delete-icon' className='h-4 w-4' />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostImageUpload;
