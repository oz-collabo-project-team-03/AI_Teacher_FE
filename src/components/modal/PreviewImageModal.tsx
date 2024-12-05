import { modalCloseIcon } from '@/assets/assets';

type PreviewImageModalProps = {
  isOpen: boolean;
  imageUrl: string | null;
  onClose: () => void;
};

const PreviewImageModal = ({
  isOpen,
  imageUrl,
  onClose,
}: PreviewImageModalProps) => {
  if (!isOpen || !imageUrl) return null; // Modal이 열리지 않았거나 이미지 URL이 없으면 렌더링하지 않음

  return (
    <div
      className='fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-black bg-opacity-50'
      onClick={onClose}
    >
      <div
        className='relative max-w-[250px] rounded-lg bg-white p-4'
        onClick={(e) => e.stopPropagation()}
      >
        <button className='absolute right-2 top-2' onClick={onClose}>
          <img src={modalCloseIcon} alt='modal close' />
        </button>
        <img
          src={imageUrl}
          alt='미리보기 이미지'
          className='max-h-[80vh] max-w-full rounded pt-5'
        />
      </div>
    </div>
  );
};

export default PreviewImageModal;
