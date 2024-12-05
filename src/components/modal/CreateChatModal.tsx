import React, { useEffect, useState } from 'react';

import Button from '../common/Button';
import Input from '../common/Input';
import { modalCloseIcon } from '@/assets/assets';

type CreateChatModalProps = {
  onClose: () => void;
  onCreateChat: (roomName: string) => void;
  errorMessage?: string;
};

const CreateChatModal = ({
  onClose,
  onCreateChat,
  errorMessage,
}: CreateChatModalProps) => {
  const [roomName, setRoomName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input.length <= 25) {
      setRoomName(input);
    }
  };

  const handleCreateChat = () => {
    if (roomName.trim()) {
      onCreateChat(roomName);
      setRoomName('');
    } else {
      alert('채팅방 제목을 입력하세요.');
    }
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className='absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      onClick={handleModalClick}
      role='dialog'
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      <div
        className='h-auto w-full max-w-[390px] rounded-[16px] border border-inputBorderColor bg-white p-[16px]'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex justify-end'>
          <img
            src={modalCloseIcon}
            alt='닫기'
            className='cursor-pointer transition-transform duration-200 hover:scale-110 hover:opacity-80'
            onClick={onClose}
          />
        </div>
        <div
          id='modal-title'
          className='mb-[21px] text-center text-[18px] font-medium'
        >
          생성할 채팅방 제목을 입력하세요
        </div>
        <div className='mb-[12px]'>
          <Input
            type='text'
            value={roomName}
            onChange={handleInputChange}
            placeholder='국어 수행평가'
          />
        </div>
        <Button variant='active' onClick={handleCreateChat}>
          수행평가 보러가기
        </Button>

        {errorMessage && (
          <div className='mt-4 text-center text-red-500'>{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default CreateChatModal;
