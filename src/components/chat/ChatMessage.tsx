import ChatAiBubble from './bubbles/ChatAiBubble';
import { ChatMessageProps } from '../../types/index';
import ChatMyBubble from './bubbles/ChatMyBubble';
import ChatTeacherBubble from './bubbles/ChatTeacherBubble';
import React from 'react';

// import ChatSystemBubble from './bubbles/ChatSystemBubble';

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  nickname,
  userType,
}) => {
  const renderBubble = () => {
    switch (userType) {
      case 'user':
        return <ChatMyBubble message={message} />;
      case 'ai':
        return <ChatAiBubble message={message} />;
      case 'teacher':
        return <ChatTeacherBubble message={message} />;
      default:
        return null;
    }
  };

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
        {renderBubble()}
      </div>
    </div>
  );
};

export default ChatMessage;
