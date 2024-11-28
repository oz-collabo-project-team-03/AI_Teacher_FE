import { useEffect, useRef, useState } from 'react';

import ChatInput from '../../components/chat/ChatInput';
import ChatMessage from '../../components/chat/ChatMessage';
import { ChatMessageProps } from '../../types/index';
import Header from '../../components/common/Header';
import HelpButton from '../../components/chat/HelpButton';
import { chatPlusIcon } from '../../assets/assets';

const StudentChatRoomPage = () => {
  const [buttonType, setButtonType] = useState<'help' | 'end'>('help');
  const [chatStatus, setChatStatus] = useState<'ai' | 'teacher'>('ai');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessageProps[]>([
    {
      message: '안녕하세요!',
      nickname: 'AI',
      profileImage: '/images/ai-profile.png',
      isMe: false,
      userType: 'ai',
    },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // 새로운 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  //웹소켓 연결시의 상황으로 코드수정해야함
  const handleHelpButtonClick = () => {
    setChatMessages((prevMessages) => {
      // 현재 상태에 따라 메시지 결정
      if (chatStatus === 'ai') {
        return [
          ...prevMessages,
          {
            message: 'AI와 메시지가 종료되었습니다.',
            nickname: '',
            profileImage: '',
            isMe: false,
            userType: 'system',
            isLast: false,
          },
          {
            message: '담임 선생님과 메시지가 연결되었습니다.',
            nickname: '',
            profileImage: '',
            isMe: false,
            userType: 'system',
            isLast: true, // 마지막 메시지
          },
        ];
      } else {
        return [
          ...prevMessages,
          {
            message: '담임 선생님과의 메시지가 종료되었습니다.',
            nickname: '',
            profileImage: '',
            isMe: false,
            userType: 'system',
            isLast: false,
          },
          {
            message: 'AI와 메시지가 연결되었습니다.',
            nickname: '',
            profileImage: '',
            isMe: false,
            userType: 'system',
            isLast: true, // 마지막 메시지
          },
        ];
      }
    });

    setChatStatus((prevStatus) => (prevStatus === 'ai' ? 'teacher' : 'ai'));
    setButtonType((prevType) => (prevType === 'help' ? 'end' : 'help'));
  };

  // 파일 선택 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Selected file:', file);
      // 이후에 파일 업로드 로직을 추가 자리
    }
  };

  // +버튼 클릭 시 파일 입력창 열기
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 메시지 전송 핸들러
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
        title='국어 독후감 수행평가'
        rightElement={
          <HelpButton type={buttonType} onClick={handleHelpButtonClick} />
        }
      />
      <div className='custom-scrollbar flex-grow overflow-y-auto'>
        {chatMessages.map((msg, index) => (
          <ChatMessage
            key={index}
            message={msg.message}
            nickname={msg.nickname}
            profileImage={msg.profileImage}
            isMe={msg.isMe}
            userType={msg.userType}
            {...(msg.userType === 'system' ? { isLast: msg.isLast } : {})}
          />
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className='sticky bottom-0 mx-auto w-full bg-white p-[18px] shadow-navShadow'>
        <ChatInput onSendMessage={handleSendMessage} />

        <button
          className='absolute left-6 top-1/2 flex h-[23px] w-[40px] -translate-y-1/2 items-center justify-center border-r border-primaryColor'
          onClick={handleButtonClick}
        >
          <img
            src={chatPlusIcon}
            alt='plus icon'
            className='h-[16px] w-[16px]'
          />
        </button>
        <input
          type='file'
          accept='image/*'
          ref={fileInputRef}
          onChange={handleFileChange}
          className='hidden'
        />
      </div>
    </div>
  );
};

export default StudentChatRoomPage;
