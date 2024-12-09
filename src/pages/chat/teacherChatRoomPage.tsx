import { useCallback, useEffect, useRef, useState } from 'react';

import ChatInput from '@/components/chat/ChatInput';
import ChatMessage from '@/components/chat/ChatMessage';
import { ChatMessageRequestParams } from '@/types/chat';
import Header from '@/components/common/Header';
import HelpButton from '@/components/chat/HelpButton';
import LoadingPage from '../status/loadingPage';
import { chatPlusIcon } from '@/assets/assets';
import { useChatWebSocket } from '@/api/chat/chatWebSocket/chatWebSocket.hooks';
import { useGetChatMessagesQuery } from '@/api/chat/chatMessages/chatMessages.hooks';
import { useParams } from 'react-router-dom';
import { useProfile } from '@/hooks/useProfile';

const TeacherChatRoomPage = () => {
  const [roomTitle, setRoomTitle] = useState<string>('');
  const [page] = useState<number>(1);
  const [chatMessages, setChatMessages] = useState<ChatMessageRequestParams[]>(
    []
  );
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showLoading, setShowLoading] = useState(true);

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

  // WebSocket 관련 상태 및 함수
  const { sendMessage, lastMessage } = useChatWebSocket(
    roomIdNumber,
    userId || 0
  );

  const [, setIsNewMessageAdded] = useState(false);

  const { data } = useGetChatMessagesQuery({
    room_id: roomIdNumber,
    page,
  });

  const helpChecked = data?.help_checked || false;

  // 새로운 메시지 병합
  const mergeMessages = useCallback(
    (newMessages: ChatMessageRequestParams[]) => {
      setChatMessages((prevMessages) => {
        const allMessages = [...newMessages, ...prevMessages];
        const uniqueMessages = Array.from(
          new Map(
            allMessages.map((msg) => [msg.message + msg.timestamp, msg])
          ).values()
        );
        return uniqueMessages.reverse();
      });
    },
    [setChatMessages]
  );

  // 기존 메시지 불러오기
  useEffect(() => {
    if (data) {
      const studentProfileImage =
        data.student_profile || '/images/default-student-profile.png';
      const aiProfileImage =
        data.ai_profile || '/images/default-ai-profile.png';

      setRoomTitle(data.student_nickname || '');
      const newMessages: ChatMessageRequestParams[] = data.messages.map(
        (message) => ({
          message: message.content,
          message_type: message.message_type,
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
          timestamp: message.timestamp,
        })
      );

      mergeMessages(newMessages);
      setShowLoading(false);
    }
  }, [data, mergeMessages]);

  // WebSocket 메시지 처리
  useEffect(() => {
    if (lastMessage) {
      const newChatMessage: ChatMessageRequestParams = {
        message: lastMessage.content,
        message_type: lastMessage.message_type,
        nickname:
          lastMessage.user_type === 'student'
            ? `${data?.student_nickname || '이름없음'}`
            : lastMessage.user_type === 'ai'
              ? 'AI'
              : 'System',
        profileImage:
          lastMessage.user_type === 'student'
            ? data?.student_profile || ''
            : lastMessage.user_type === 'ai'
              ? data?.ai_profile || ''
              : '',
        userType: lastMessage.user_type,
        timestamp: lastMessage.timestamp,
      };

      setChatMessages((prevMessages) => {
        // 중복 메시지 확인
        const exists = prevMessages.some(
          (msg) =>
            msg.timestamp === newChatMessage.timestamp &&
            msg.message === newChatMessage.message
        );
        if (!exists) {
          return [...prevMessages, newChatMessage]; // 중복되지 않은 경우에만 추가
        }
        return prevMessages;
      });
      setIsNewMessageAdded(true);
    }
  }, [lastMessage, data]);

  // 새로운 메시지로 스크롤 자동 이동
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // 메세지 전송
  const handleSendMessage = (newMessage: string) => {
    try {
      const trimmedMessage = newMessage.trim();
      if (!trimmedMessage) {
        console.error('빈 메시지는 전송할 수 없습니다');
        return;
      }

      // 마지막 메시지와 비교하여 중복 여부 확인
      const lastMessage = chatMessages[chatMessages.length - 1];
      if (lastMessage?.message === trimmedMessage) {
        console.error('중복 메시지는 전송할 수 없습니다');
        return;
      }

      sendMessage({
        sender_id: userId,
        content: trimmedMessage,
        timestamp: new Date().toISOString(),
        message_type: 'text',
        user_type: 'teacher',
      });
    } catch (error) {
      console.error('WebSocket 메시지 전송 중 에러:', error);
    }
  };

  // 이미지 첨부파일
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        console.error('파일 크기가 10MB를 초과합니다.');
        event.target.value = '';
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const base64Data = reader.result as string; // Base64 인코딩된 데이터
        const payload = {
          sender_id: userId,
          content: base64Data, // 서버로 전송되는 Base64 데이터
          filename: file.name, // 파일이름은 백엔드와 협의중 (아직추가안됨)
          message_type: 'image',
          timestamp: new Date().toISOString(),
          user_type: 'teacher',
        };

        console.log('WebSocket으로 전송될 데이터:', payload);

        // WebSocket으로 Base64 데이터 전송
        sendMessage(payload);

        // UI에는 파일 이름만 추가
        const newChatMessage: ChatMessageRequestParams = {
          message: file.name,
          message_type: 'image',
          nickname: '나',
          profileImage: '',
          userType: 'teacher',
          timestamp: new Date().toISOString(),
        };
        setChatMessages((prevMessages) => [...prevMessages, newChatMessage]);
      };

      reader.readAsDataURL(file);
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
        <ChatInput onSendMessage={handleSendMessage} />
        <button
          className='absolute left-6 top-1/2 flex h-[23px] w-[40px] -translate-y-1/2 items-center justify-center pl-[10px]'
          onClick={handleButtonClick}
          disabled={!helpChecked}
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
