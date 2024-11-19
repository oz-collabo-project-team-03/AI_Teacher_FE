import Button from '../common/Button';
import React from 'react';

type DeleteChatModalProps = {
  onClose: () => void;
};

const DeleteChatModal: React.FC<DeleteChatModalProps> = ({ onClose }) => {
  return (
    <div
      className='absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      onClick={onClose}
    >
      <div className='mt-[250px] h-[210px] w-[337px] rounded-[16px] border border-inputBorderColor bg-white p-[8px]'>
        <div className='flex flex-col items-center justify-center space-y-2 py-[40px]'>
          <div className='text-[18px] font-normal text-textMainColor'>
            채팅방을 삭제하시겠습니까?
          </div>
          <p className='text-[14px] text-captionColor'>
            삭제된 채팅방은 복구되지 않습니다.
          </p>
        </div>
        <div className='mb-[8px] flex space-x-[7px]'>
          <Button variant='cancel' onClick={onClose}>
            취소
          </Button>
          <Button variant='active'>삭제하기</Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteChatModal;
