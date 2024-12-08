import { useCallback, useEffect, useRef, useState } from 'react';

import ChatInput from '@/components/chat/ChatInput';
import ChatMessage from '@/components/chat/ChatMessage';
import { ChatMessageProps } from '@/types/chat';
import Header from '@/components/common/Header';
import HelpButton from '@/components/chat/HelpButton';
import LoadingPage from '../status/loadingPage';
import { chatPlusIcon } from '@/assets/assets';
import { useChatWebSocket } from '@/api/chat/chatWebSocket/chatWebSocket.hooks';
import { useGetChatMessagesQuery } from '@/api/chat/chatMessages/chatMessages.hooks';
import { useParams } from 'react-router-dom';
import { usePatchChatHelpMutation } from '@/api/chat/chatHelp/chatHelp.hooks';
import { useProfile } from '@/hooks/useProfile';

const StudentChatRoomPage = () => {
  const [buttonType, setButtonType] = useState<'help' | 'end'>('help');
  const [roomTitle, setRoomTitle] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<ChatMessageProps[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [page] = useState<number>(1);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showLoading, setShowLoading] = useState(true);

  // 유저 정보 가져오기
  const { profileData } = useProfile();
  const userId = profileData?.id;

  if (userId === null) {
    console.error('userId가 없습니다! WebSocket 연결 실패');
    return null;
  }

  // URL에서 roomId를 가져오고 number로 변환
  const { roomId } = useParams<{ roomId: string }>();
  const roomIdNumber = parseInt(roomId!, 10);

  if (isNaN(roomIdNumber)) {
    console.error('roomId가 유효한 숫자가 아닙니다.');
  }

  const { data } = useGetChatMessagesQuery({
    room_id: roomIdNumber,
    page,
    page_size: 20,
  });

  // WebSocket 관련 상태 및 함수
  const { sendMessage, lastMessage } = useChatWebSocket(
    roomIdNumber,
    userId as number
  );

  const { mutate: patchChatHelp } = usePatchChatHelpMutation({
    onSuccess: (data) => {
      setButtonType(data.help_checked ? 'end' : 'help');
    },
    onError: (error) => {
      console.error('Help 요청 실패:', error);
    },
  });

  const mergeMessages = useCallback(
    (newMessages: ChatMessageProps[]) => {
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
      const formattedMessages = data.messages.map((message) => ({
        message: message.content,
        message_type: message.message_type,
        nickname:
          message.user_type === 'teacher'
            ? `${data.teacher_nickname || '이름없음'} 선생님`
            : message.user_type === 'ai'
              ? 'AI'
              : 'system',
        profileImage:
          message.user_type === 'teacher'
            ? data.teacher_profile || ''
            : message.user_type === 'ai'
              ? data.ai_profile || ''
              : '',
        userType: message.user_type,
        timestamp: message.timestamp,
      }));
      mergeMessages(formattedMessages);
      setRoomTitle(data.title || '');
      setButtonType(data.help_checked ? 'end' : 'help');
      setShowLoading(false);
    }
  }, [data, mergeMessages]);

  // WebSocket 메시지 처리
  useEffect(() => {
    if (lastMessage) {
      const newChatMessage: ChatMessageProps = {
        message: lastMessage.content,
        message_type: lastMessage.message_type,
        nickname:
          lastMessage.user_type === 'teacher'
            ? `${data?.teacher_nickname || '이름없음'} 선생님`
            : lastMessage.user_type === 'ai'
              ? 'AI'
              : 'system',
        profileImage:
          lastMessage.user_type === 'teacher'
            ? data?.teacher_profile || ''
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
          return [...prevMessages, newChatMessage];
        }
        return prevMessages;
      });
    }
  }, [lastMessage, data]);

  //새로운 메시지로 스크롤 자동 이동
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // Help 버튼 클릭시
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

  // 메세지 전송
  const handleSendMessage = (newMessage: string) => {
    console.log('[handleSendMessage 호출]', newMessage);
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

      try {
        console.log('전송 데이터:', {
          sender_id: userId,
          content: `${file.name}`,
          timestamp: new Date().toISOString(),
          message_type: 'image',
          user_type: 'student',
        });

        // 웹소켓을 통해 파일 데이터 전송
        sendMessage({
          sender_id: userId,
          content: `${file.name}`,
          timestamp: new Date().toISOString(),
          message_type: 'image',
          user_type: 'student',
        });

        // UI에 이미지 미리보기 메시지 추가
        const newChatMessage: ChatMessageProps = {
          message: file.name,
          message_type: 'image',
          nickname: '나',
          profileImage: '',
          userType: 'student',
          timestamp: new Date().toISOString(),
        };
        setChatMessages((prevMessages) => [...prevMessages, newChatMessage]);
      } catch (error) {
        console.error('이미지 파일 처리 중 오류:', error);
      }
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
          className='absolute left-6 top-1/2 flex h-[23px] w-[40px] -translate-y-1/2 items-center justify-center pl-[10px]'
          onClick={handleButtonClick}
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
