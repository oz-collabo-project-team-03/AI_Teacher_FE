import { useEffect, useRef, useState } from 'react';

import ChatInput from '@/components/chat/ChatInput';
import ChatMessage from '@/components/chat/ChatMessage';
import { ChatMessageProps } from '@/types/chat';
import Header from '@/components/common/Header';
import HelpButton from '@/components/chat/HelpButton';
import LoadingPage from '../status/loadingPage';
import { chatPlusIcon } from '@/assets/assets';
import { useGetChatMessagesQuery } from '@/api/chat/chatMessages/chatMessages.hooks';
import { useParams } from 'react-router-dom';
import { usePatchChatHelpMutation } from '@/api/chat/chatHelp/chatHelp.hooks';

const StudentChatRoomPage = () => {
  const [buttonType, setButtonType] = useState<'help' | 'end'>('help');
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

  const { mutate: patchChatHelp } = usePatchChatHelpMutation({
    onSuccess: (data) => {
      console.log('Help 요청 성공:', data);
      setButtonType(data.help_checked ? 'end' : 'help');
    },
    onError: (error) => {
      console.error('Help 요청 실패:', error);
    },
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
      const teacherProfileImage =
        data.teacher_profile || '/images/default-teacher-profile.png';
      const aiProfileImage =
        data.ai_profile || '/images/default-ai-profile.png';

      setRoomTitle(data.title || '');
      const newMessages: ChatMessageProps[] = data.messages.map((message) => ({
        message: message.content,
        message_type: 'text',
        nickname:
          message.user_type === 'teacher'
            ? `${data.teacher_nickname || '이름없음'} 선생님`
            : message.user_type === 'ai'
              ? 'AI'
              : 'System',
        profileImage:
          message.user_type === 'teacher'
            ? teacherProfileImage
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

      setButtonType(data.help_checked ? 'end' : 'help');
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

  const handleHelpButtonClick = () => {
    if (!chatId) {
      console.error('room_id(chatId)가 없습니다!');
      return;
    }

    patchChatHelp({
      room_id: chatId,
      helpData: { room_id: chatId },
    });
  };

  const handleSendMessage = (newMessage: string) => {
    const newChatMessage: ChatMessageProps = {
      message: newMessage,
      message_type: 'text',
      nickname: '나',
      profileImage: '',
      userType: 'student',
    };

    setChatMessages((prevMessages) => [...prevMessages, newChatMessage]);
    setIsNewMessageAdded(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newChatMessage: ChatMessageProps = {
        message: file.name,
        message_type: 'image',
        nickname: '나',
        profileImage: '',
        userType: 'student',
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
          <HelpButton type={buttonType} onClick={handleHelpButtonClick} />
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
            myUserType='student'
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
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              if (file.size > 10 * 1024 * 1024) {
                // alert('파일 크기는 10MB 이하여야 합니다.'); 이부분을 토스트메세지로 추가하기
                e.target.value = '';
                return;
              }
              handleFileChange(e);
            }
          }}
          className='hidden'
        />
      </div>
    </div>
  );
};

export default StudentChatRoomPage;
