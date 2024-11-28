import React, { useState } from 'react';

import Button from '../common/Button';
import Input from '../common/Input';
import { modalCloseIcon } from '../../assets/assets';

type CreateChatModalProps = {
  onClose: () => void;
  onCreateChat: (roomName: string) => void;
};

const CreateChatModal = ({ onClose, onCreateChat }: CreateChatModalProps) => {
  const [roomName, setRoomName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };

  const handleCreateChat = () => {
    if (roomName.trim()) {
      onCreateChat(roomName); // 부모로 전달
    } else {
      alert('채팅방 제목을 입력하세요.');
    }
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className='absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      onClick={onClose}
    >
      <div
        className='h-auto w-full max-w-[390px] rounded-[16px] border border-inputBorderColor bg-white p-[16px]'
        onClick={handleModalClick}
      >
        <div className='flex justify-end'>
          <img
            src={modalCloseIcon}
            alt='Modal close'
            className='cursor-pointer transition-transform duration-200 hover:scale-110 hover:opacity-80'
            onClick={onClose}
          />
        </div>
        <div className='mb-[21px] text-center text-[18px] font-medium'>
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
      </div>
    </div>
  );
};

export default CreateChatModal;
