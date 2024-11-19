import { ChatBubbleProps } from '../../../types/index';
import React from 'react';

const ChatAiBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  return (
    <div className='flex'>
      {/* 말풍선 꼬리 */}
      <div className='h-0 w-0 border-b-[10px] border-l-[10px] border-r-[10px] border-t-[10px] border-b-transparent border-l-transparent border-r-transparent border-t-chatBubbleColor'></div>
      <div className='relative left-[-15px] max-w-[245px] rounded-[10px] bg-chatBubbleColor p-[14px]'>
        <p className='break-words text-[14px] font-normal text-textMainColor'>
          {message}
        </p>
      </div>
    </div>
  );
};

export default ChatAiBubble;
