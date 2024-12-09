import { ChatMyBubble, ChatOtherBubble, ChatSystemBubble } from './bubbles';

import { ChatMessageRequestParams } from '@/types/chat';
import { useMemo } from 'react';

const ChatMessage = ({
  message,
  nickname,
  userType,
  profileImage,
  myUserType,
  message_type,
}: ChatMessageRequestParams & { myUserType: string }) => {
  // 내가 보낸 메시지인지 판별
  const isMyMessage = useMemo(
    () => userType === myUserType,
    [userType, myUserType]
  );

  // 시스템 메시지일 경우
  if (userType === 'system') {
    return (
      <div className='text-center text-[12px] text-captionColor'>
        <ChatSystemBubble message={message} message_type={message_type} />
      </div>
    );
  }

  return (
    <div className={`m-[13px] flex ${isMyMessage ? 'justify-end' : ''}`}>
      {!isMyMessage && (
        <img
          className='h-[50px] w-[50px] overflow-hidden rounded-full object-cover'
          src={profileImage}
          alt={`${nickname} profile`}
        />
      )}
      <div className={`ml-[14px] ${isMyMessage ? 'text-right' : 'text-left'}`}>
        {!isMyMessage && (
          <div className='text-[14px] text-captionColor'>{nickname}</div>
        )}
        {isMyMessage ? (
          <ChatMyBubble message={message} message_type={message_type} />
        ) : (
          <ChatOtherBubble message={message} message_type={message_type} />
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
