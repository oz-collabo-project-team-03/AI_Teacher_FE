import { useEffect, useRef, useState } from 'react';

import ChatInput from '../../components/chat/ChatInput';
import ChatMessage from '../../components/chat/ChatMessage';
import { ChatMessageProps } from '@/types/chat';
import Header from '../../components/common/Header';
import HelpButton from '../../components/chat/HelpButton';
import LoadingPage from '../status/loadingPage';
import { chatPlusIcon } from '../../assets/assets';
import { useGetChatMessagesQuery } from '@/api/chat/chatMessages/chatMessages.hooks';
import { useParams } from 'react-router-dom';

const TeacherChatRoomPage = () => {
  const [roomTitle, setRoomTitle] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<ChatMessageProps[]>([]);
  const [page, setPage] = useState<number>(1);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { chatId } = useParams<{ chatId: string }>();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLoading, setShowLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isNewMessageAdded, setIsNewMessageAdded] = useState(false);

  const { data, isLoading, error } = useGetChatMessagesQuery({
    room_id: chatId!,
    page,
    page_size: 20,
  });

  const loadMoreMessages = () => {
    if (chatContainerRef.current) {
      const scrollHeight = chatContainerRef.current.scrollHeight;
      const scrollTop = chatContainerRef.current.scrollTop;
      setScrollPosition(scrollHeight - scrollTop);
    }
    setIsLoadingMore(true);
    setShowLoading(true);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (data) {
      const studentProfileImage =
        data.student_profile || '/images/default-student-profile.png';
      const aiProfileImage =
        data.ai_profile || '/images/default-ai-profile.png';

      setRoomTitle(data.student_nickname || '');
      const newMessages: ChatMessageProps[] = data.messages.map((message) => ({
        message: message.content,
        message_type: 'text',
        nickname:
          message.user_type === 'student'
            ? `${data.student_nickname || '이름없음'}`
            : message.user_type === 'ai'
              ? 'AI'
              : 'System',
        profileImage:
          message.user_type === 'student'
            ? studentProfileImage
            : message.user_type === 'ai'
              ? aiProfileImage
              : '',
        userType: message.user_type,
      }));

      setTimeout(() => {
        if (isLoadingMore) {
          setChatMessages((prevMessages) => [...newMessages, ...prevMessages]);
          setIsLoadingMore(false);

          setTimeout(() => {
            if (chatContainerRef.current) {
              chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight - scrollPosition;
            }
          }, 0);
        } else {
          setChatMessages(newMessages);
          if (isInitialLoad) {
            setIsInitialLoad(false);
            setIsNewMessageAdded(true);
          }
        }
        setShowLoading(false);
      }, 1000);
    }
  }, [data]);

  useEffect(() => {
    if (chatEndRef.current && (isNewMessageAdded || isInitialLoad)) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
      setIsNewMessageAdded(false);
    }
  }, [chatMessages, isNewMessageAdded, isInitialLoad]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    if (scrollTop === 0 && !isLoading && !error && !isLoadingMore) {
      loadMoreMessages();
    }
  };

  const handleSendMessage = (newMessage: string) => {
    const newChatMessage: ChatMessageProps = {
      message: newMessage,
      message_type: 'text',
      nickname: '나',
      profileImage: '',
      userType: 'teacher',
    };

    setChatMessages((prevMessages) => [...prevMessages, newChatMessage]);
    setIsNewMessageAdded(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB 이상일 경우 알림 추가 (토스트 메세지)
        alert('파일 크기는 10MB를 초과할 수 없습니다.');
        return;
      }
      const newChatMessage: ChatMessageProps = {
        message: file.name, // 파일 이름을 표시
        message_type: 'image',
        nickname: '나',
        profileImage: '',
        userType: 'teacher',
      };
      setChatMessages((prevMessages) => [...prevMessages, newChatMessage]);
      setIsNewMessageAdded(true);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (showLoading) {
    return <LoadingPage />;
  }

  return (
    <div className='flex h-full flex-col pt-[72px]'>
      <Header
        title={roomTitle || '이름없음'}
        rightElement={
          <HelpButton type='help' onClick={() => {}} disabled={true} />
        }
      />
      <div
        ref={chatContainerRef}
        className='custom-scrollbar flex-grow overflow-y-auto'
        onScroll={handleScroll}
      >
        {chatMessages.map((msg, index) => (
          <ChatMessage
            key={index}
            message={msg.message}
            nickname={msg.nickname}
            profileImage={msg.profileImage}
            userType={msg.userType}
            myUserType='teacher'
            message_type={msg.message_type}
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

export default TeacherChatRoomPage;
