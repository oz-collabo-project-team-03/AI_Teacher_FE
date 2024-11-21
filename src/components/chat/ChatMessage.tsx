import ChatAiBubble from './bubbles/ChatAiBubble';
import { ChatMessageProps } from '../../types/index';
import ChatMyBubble from './bubbles/ChatMyBubble';
import ChatTeacherBubble from './bubbles/ChatTeacherBubble';
import React from 'react';

const ChatMessage = ({ message, nickname, userType }: ChatMessageProps) => {
  // 객체 매핑 방식으로 변경
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
      className={`m-[13px] flex ${userType === 'user' ? 'justify-end' : ''}`}
    >
      {userType !== 'user' && (
        <div className='h-[50px] w-[50px] rounded-full bg-primaryColor'></div>
      )}
      <div
        className={`ml-[14px] ${userType === 'user' ? 'text-right' : 'text-left'}`}
      >
        {userType !== 'user' && (
          <div className='text-[14px] text-captionColor'>{nickname}</div>
        )}
        {/* BubbleComponent가 존재하면 렌더링 */}
        {BubbleComponent ? <BubbleComponent message={message} /> : null}
      </div>
    </div>
  );
};

export default ChatMessage;
