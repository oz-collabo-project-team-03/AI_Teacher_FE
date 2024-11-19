import { ChatBubbleProps } from '../../../types/index';
import React from 'react';

const ChatMyBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  return (
    <div className='flex justify-end'>
      {/* 말풍선 꼬리 */}
      <div className='max-w-[245px] rounded-[10px] bg-primaryColor p-[14px]'>
        <p className='break-words text-[14px] font-normal text-white'>
          {message}
        </p>
      </div>
      <div className='relative left-[-15px] h-0 w-0 border-b-[10px] border-l-[10px] border-r-[10px] border-t-[10px] border-b-transparent border-l-transparent border-r-transparent border-t-primaryColor'></div>
    </div>
  );
};

export default ChatMyBubble;
