import { useCallback, useEffect, useRef, useState } from 'react';

import ChatInput from '@/components/chat/ChatInput';
import ChatMessage from '@/components/chat/ChatMessage';
import { ChatMessageData } from '@/types/chat';
import ErrorPage from '../status/errorPage';
import Header from '@/components/common/Header';
import HelpButton from '@/components/chat/HelpButton';
import LoadingPage from '../status/loadingPage';
import { chatPlusIcon } from '@/assets/assets';
import { getMessageMetadata } from '@/utils/getMessageMetadata';
import { useChatMessagesInfiniteQuery } from '@/api/chat/chatMessages/chatMessages.hooks';
import { useChatWebSocket } from '@/api/chat/chatWebSocket/chatWebSocket.hooks';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useMergeMessages } from '@/hooks/chat/useMergeMessages';
import { useParams } from 'react-router-dom';
import { useProfile } from '@/hooks/useProfile';

const TeacherChatRoomPage = () => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [roomTitle, setRoomTitle] = useState<string>('');
  const [page] = useState<number>(1);
  const [chatMessages, setChatMessages] = useState<ChatMessageData[]>([]);
  const [isComposing, setIsComposing] = useState(false); // 한글 조합 상태 관리
  const [helpChecked, setHelpChecked] = useState(false);

  const { profileData } = useProfile();
  const userId = profileData?.id;
  if (userId === null) {
    return null;
  }

  const { roomId } = useParams<{ roomId: string }>();
  const roomIdNumber = parseInt(roomId!, 10);
  if (isNaN(roomIdNumber)) {
  }

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    error,
    refetch,
  } = useChatMessagesInfiniteQuery({
    room_id: roomIdNumber,
    page,
  });

  const observerRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
  });

  // WebSocket 관련 상태 및 함수
  const { sendMessage, lastMessage } = useChatWebSocket(
    roomIdNumber,
    userId as number
  );

  const { mergeMessages } = useMergeMessages();
  // 메시지 병합
  const mergeAndSetMessages = useCallback(
    (newMessages: ChatMessageData[]) => {
      setChatMessages((prevMessages) =>
        mergeMessages(prevMessages, newMessages)
      );
    },
    [mergeMessages]
  );

  // 채팅 데이터 가져올 때 처리
  useEffect(() => {
    if (data) {
      const firstPage = data.pages[0];
      setHelpChecked(firstPage.help_checked || false);

      const allMessages = data.pages.flatMap((page) =>
        page.messages.map((message) => {
          const { nickname, profileImage } = getMessageMetadata(
            message.user_type,
            page
          );

          return {
            message: message.content,
            message_type: message.message_type,
            filename: message.filename,
            nickname,
            profileImage,
            userType: message.user_type,
            timestamp: message.timestamp,
          };
        })
      );

      mergeAndSetMessages(allMessages);
      setRoomTitle(data.pages[0]?.student_nickname || '');
    }
  }, [data, mergeMessages]);

  // WebSocket 마지막 메시지 처리
  useEffect(() => {
    if (lastMessage && data?.pages.length) {
      const firstPage = data.pages[0];

      const { nickname, profileImage } = getMessageMetadata(
        lastMessage.user_type,
        firstPage
      );

      const newChatMessage: ChatMessageData = {
        message: lastMessage.content,
        message_type: lastMessage.message_type,
        nickname,
        profileImage,
        userType: lastMessage.user_type,
        timestamp: lastMessage.timestamp,
      };

      setChatMessages((prevMessages) => {
        const exists = prevMessages.some(
          (msg) =>
            msg.timestamp === newChatMessage.timestamp &&
            msg.message === newChatMessage.message
        );
        if (!exists) {
          return [...prevMessages, newChatMessage];
        }
        return prevMessages;
      });
    }
  }, [lastMessage, data]);

  // 스크롤 동작을 캡슐화한 함수
  const scrollToElement = useCallback((element: HTMLElement) => {
    element.scrollIntoView({ behavior: 'instant', block: 'end' });
  }, []);

  // 초기 스크롤 상태 관리
  const [initialScrollComplete, setInitialScrollComplete] = useState(false);

  // 채팅 자동 스크롤 처리 (chatMessages 업데이트될 때 실행)
  useEffect(() => {
    if (chatEndRef.current) {
      if (!initialScrollComplete) {
        scrollToElement(chatEndRef.current);
        setInitialScrollComplete(true);
      } else {
        // 이후 메시지가 추가되면 부드러운 스크롤
        chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [chatMessages, scrollToElement, initialScrollComplete]);

  // 텍스트 메시지 전송 핸들러
  const handleSendMessage = (newMessage: string) => {
    if (isComposing) {
      return;
    }

    try {
      const trimmedMessage = newMessage.trim();
      if (!trimmedMessage) {
        return;
      }

      sendMessage({
        sender_id: userId,
        content: trimmedMessage,
        timestamp: new Date().toISOString(),
        message_type: 'text',
        user_type: 'teacher',
      });
    } catch (error) {}
  };

  // 파일 첨부 전송 핸들러
  const { fileInputRef, handleFileChange, openFileDialog } = useFileUpload(
    (fileContent, fileName) => {
      const contentJson = {
        content: fileContent,
        filename: fileName,
        message_type: 'image',
      };

      try {
        sendMessage({
          sender_id: userId,
          content: JSON.stringify(contentJson),
          message_type: 'image',
          timestamp: new Date().toISOString(),
          user_type: 'student',
        });
      } catch (error) {}
    }
  );

  if (isLoading) return <LoadingPage />;

  if (isError) {
    return <ErrorPage error={error as Error} resetError={() => refetch()} />;
  }

  return (
    <div className='flex h-full flex-col pt-[72px]'>
      <Header
        title={roomTitle || '이름없음'}
        rightElement={
          <HelpButton type='help' onClick={() => {}} disabled={true} />
        }
      />
      <div ref={observerRef} className='h-2' />
      <div
        ref={chatContainerRef}
        className='custom-scrollbar flex-grow overflow-y-auto overflow-x-hidden'
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
        <ChatInput
          onSendMessage={handleSendMessage}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
        />
        <button
          className='absolute left-6 top-1/2 flex h-[23px] w-[40px] -translate-y-1/2 items-center justify-center pl-[10px] transition-opacity duration-200'
          onClick={helpChecked ? openFileDialog : undefined}
          style={{
            opacity: helpChecked ? 1 : 0.5,
            cursor: helpChecked ? 'pointer' : 'not-allowed',
          }}
        >
          <img
            src={chatPlusIcon}
            alt='plus icon'
            className='h-[16px] w-[16px] transition-transform duration-200 hover:scale-110 hover:opacity-80'
          />
          <div className='h-[20px] w-[3px] border-r border-primaryColor pl-[10px]'></div>
        </button>
        <input
          type='file'
          accept='image/*'
          ref={fileInputRef}
          onChange={handleFileChange}
          className='hidden'
          disabled={!helpChecked}
        />
      </div>
    </div>
  );
};

export default TeacherChatRoomPage;
