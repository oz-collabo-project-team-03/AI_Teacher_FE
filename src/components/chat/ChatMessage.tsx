import { ChatAiBubble, ChatMyBubble, ChatTeacherBubble } from './bubbles';

import { ChatMessageProps } from '../../types/index';
import React from 'react';

const ChatMessage = ({ message, nickname, userType }: ChatMessageProps) => {
  if (userType === 'system') {
    return (
      <div className='py-[20px] text-center text-[12px] text-captionColor'>
        {message}
      </div>
    );
  }

  // 기존 채팅 말풍선 렌더링
  const bubbleComponents: Record<
    string,
    (props: { message: string }) => React.ReactNode
  > = {
    user: ChatMyBubble,
    ai: ChatAiBubble,
    teacher: ChatTeacherBubble,
  };

  const BubbleComponent = bubbleComponents[userType];

  return (
    <div
      className={`m-[13px] flex ${userType === 'user' ? 'mr-[0px] justify-end' : ''}`}
    >
      {userType !== 'user' && (
        <div className='h-[50px] w-[50px] rounded-full bg-primaryColor'></div>
      )}
      <div
        className={`ml-[14px] ${
          userType === 'user' ? 'text-right' : 'text-left'
        }`}
      >
        {userType !== 'user' && (
          <div className='text-[14px] text-captionColor'>{nickname}</div>
        )}
        {BubbleComponent ? <BubbleComponent message={message} /> : null}
      </div>
    </div>
  );
};

export default ChatMessage;
