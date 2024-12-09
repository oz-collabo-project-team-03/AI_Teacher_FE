import { useCallback, useEffect, useRef, useState } from 'react';

import ChatInput from '@/components/chat/ChatInput';
import ChatMessage from '@/components/chat/ChatMessage';
import { ChatMessageRequestParams } from '@/types/chat';
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
import { usePatchChatHelpMutation } from '@/api/chat/chatHelp/chatHelp.hooks';
import { useProfile } from '@/hooks/useProfile';

const StudentChatRoomPage = () => {
  const [buttonType, setButtonType] = useState<'help' | 'end'>('help');
  const [roomTitle, setRoomTitle] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<ChatMessageRequestParams[]>(
    []
  );
  const { mergeMessages } = useMergeMessages();
  const [isComposing, setIsComposing] = useState(false);
  const [helpChecked, setHelpChecked] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [page] = useState<number>(1);

  const { profileData } = useProfile();
  const userId = profileData?.id;
  if (userId === null) {
    console.error('userId가 없습니다! WebSocket 연결 실패');
    return null;
  }

  const { roomId } = useParams<{ roomId: string }>();
  const roomIdNumber = parseInt(roomId!, 10);
  if (isNaN(roomIdNumber)) {
    console.error('roomId가 유효한 숫자가 아닙니다.');
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
    userId || 0
  );

  // Help 요청 API 호출
  const { mutate: patchChatHelp } = usePatchChatHelpMutation({
    onSuccess: (data) => {
      setButtonType(data.help_checked ? 'end' : 'help');
      setHelpChecked(data.help_checked); // helpChecked 상태 즉시 업데이트
    },
    onError: (error) => {
      console.error('Help 요청 실패:', error);
    },
  });

  // 메시지 병합
  const mergeAndSetMessages = useCallback(
    (newMessages: ChatMessageRequestParams[]) => {
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
      setHelpChecked(firstPage.help_checked || false); // helpChecked 초기화
      setButtonType(firstPage.help_checked ? 'end' : 'help');

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

      mergeAndSetMessages(allMessages); // 병합된 메시지 설정
      setRoomTitle(data.pages[0]?.title || '');
      setButtonType(data.pages[0]?.help_checked ? 'end' : 'help');
    }
  }, [data, mergeAndSetMessages]);

  // WebSocket 마지막 메시지 처리
  useEffect(() => {
    if (lastMessage && data?.pages.length) {
      const firstPage = data.pages[0];
      const { nickname, profileImage } = getMessageMetadata(
        lastMessage.user_type,
        firstPage
      );

      const newChatMessage: ChatMessageRequestParams = {
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

  // 채팅 자동 스크롤 처리
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // 도움 요청 버튼 클릭 핸들러
  const handleHelpButtonClick = () => {
    if (!roomId) {
      console.error('room_id(roomId)가 없습니다!');
      return;
    }

    const roomIdNumber = parseInt(roomId, 10);
    if (isNaN(roomIdNumber)) {
      console.error('room_id가 유효한 숫자가 아닙니다.');
      return;
    }

    patchChatHelp({
      room_id: roomIdNumber,
      helpData: { room_id: roomIdNumber },
    });
  };

  // 텍스트 메시지 전송 핸들러
  const handleSendMessage = (newMessage: string) => {
    if (isComposing) {
      return;
    }

    try {
      const trimmedMessage = newMessage.trim();
      if (!trimmedMessage) {
        console.error('빈 메시지는 전송할 수 없습니다');
        return;
      }

      sendMessage({
        sender_id: userId,
        content: trimmedMessage,
        timestamp: new Date().toISOString(),
        message_type: 'text',
        user_type: 'student',
      });
    } catch (error) {
      console.error('WebSocket 메시지 전송 중 에러:', error);
    }
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
      } catch (error) {
        console.error('메시지 전송 중 에러:', error);
      }
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
          <HelpButton type={buttonType} onClick={handleHelpButtonClick} />
        }
      />
      <div ref={observerRef} className='h-2' />
      <div
        ref={chatContainerRef}
        className='custom-scrollbar flex-grow overflow-y-auto'
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
        />
      </div>
    </div>
  );
};

export default StudentChatRoomPage;
