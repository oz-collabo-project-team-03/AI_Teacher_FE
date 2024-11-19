import React, { useEffect, useRef, useState } from 'react';

import ChatInput from '../../components/chat/ChatInput';
import ChatMessage from '../../components/chat/ChatMessage';
import { ChatMessageProps } from '../../types/index';
import Header from '../../components/common/Header';
import HelpButton from '../../components/chat/HelpButton';

const StudentChatRoomPage: React.FC = () => {
  const [buttonType, setButtonType] = useState<'help' | 'end'>('help');
  const [chatMessages, setChatMessages] = useState<ChatMessageProps[]>([
    {
      message: '안녕하세요!',
      nickname: 'AI',
      profileImage: '/images/ai-profile.png',
      isMe: false,
      userType: 'ai',
    },
    {
      message: '네, 반갑습니다!',
      nickname: '나',
      profileImage: '/images/user-profile.png',
      isMe: true,
      userType: 'user',
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // 새로운 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const handleButtonClick = () => {
    setButtonType((prevType) => (prevType === 'help' ? 'end' : 'help'));

    // 다른곳에 추가예정(디자인만해둔것)
    // if (buttonType === 'help') {
    //   <>
    //     <div className='border-b border-chatListHoverColor py-[20px] text-center text-[12px] text-captionColor'>
    //       AI와 메세지가 종료되었습니다.
    //     </div>
    //     <div className='py-[20px] text-center text-[12px] text-captionColor'>
    //       담당 선생님과의 메세지가 연결되었습니다.
    //     </div>
    //   </>;
    // }
  };

  const handleSendMessage = (newMessage: string) => {
    const newChatMessage: ChatMessageProps = {
      message: newMessage,
      nickname: '나',
      profileImage: '/images/user-profile.png',
      isMe: true,
      userType: 'user',
    };
    setChatMessages((prevMessages) => [...prevMessages, newChatMessage]);
  };

  return (
    <div className='flex h-full flex-col'>
      <Header
        title='국어독후감 수행평가'
        rightElement={
          <HelpButton type={buttonType} onClick={handleButtonClick} />
        }
      />
      <div className='mb-[100px] flex-grow overflow-y-auto'>
        {chatMessages.map((msg, index) => (
          <ChatMessage
            key={index}
            message={msg.message}
            nickname={msg.nickname}
            profileImage={msg.profileImage}
            isMe={msg.isMe}
            userType={msg.userType}
          />
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className='fixed bottom-0 left-1/2 w-full -translate-x-1/2 transform bg-white p-[18px] shadow-navShadow md:w-[425px] lg:w-[425px]'>
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default StudentChatRoomPage;
