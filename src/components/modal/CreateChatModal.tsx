import Button from '../common/Button';
import Input from '../common/Input';
import React from 'react';
import { modalCloseIcon } from '../../assets/assets';

type CreateChatModalProps = {
  onClose: () => void;
};

const CreateChatModal: React.FC<CreateChatModalProps> = ({ onClose }) => {
  return (
    <div
      className='absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      onClick={onClose}
    >
      <div className='h-auto w-full max-w-[90%] rounded-[16px] border border-inputBorderColor bg-white p-[16px]'>
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
          <Input type='text' placeholder='국어 수행평가' />
        </div>
        <div>
          <Button variant='active'>수행평가 보러가기</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateChatModal;
