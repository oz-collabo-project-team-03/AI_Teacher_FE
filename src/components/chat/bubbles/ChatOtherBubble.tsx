import { ChatBubbleRequestParams } from '@/types/index';
import PreviewImageModal from '@/components/modal/PreviewImageModal';
import { chatPreviewIcon } from '@/assets/assets';
import { useState } from 'react';

export const ChatOtherBubble = ({
  message,
  message_type,
}: ChatBubbleRequestParams) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handlePreview = () => {
    const imageUrl = `${message}`;
    setPreviewImage(imageUrl);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setPreviewImage(null);
  };

  return (
    <div className='flex'>
      <div className='h-0 w-0 border-[10px] border-b-transparent border-l-transparent border-r-transparent border-t-chatBubbleColor'></div>
      <div className='relative left-[-15px] max-w-[245px] rounded-[10px] bg-chatBubbleColor p-[14px]'>
        <div className='flex items-center justify-between'>
          {message_type !== 'image' ? (
            <p className='overflow-wrap w-full break-words text-[14px] font-normal text-textMainColor'>
              {message}
            </p>
          ) : (
            <div
              className='flex min-w-[40px] max-w-[40px] cursor-pointer items-center justify-between rounded-[5px] bg-white px-[8px] shadow-lg hover:bg-unFocusColor hover:bg-opacity-20'
              onClick={handlePreview}
            >
              <button
                className='my-2 py-1'
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreview();
                }}
              >
                <img src={chatPreviewIcon} alt='Preview' className='w-[30px]' />
              </button>
            </div>
          )}
        </div>
      </div>
      <PreviewImageModal
        isOpen={isPreviewOpen}
        imageUrl={previewImage}
        onClose={handleClosePreview}
      />
    </div>
  );
};
