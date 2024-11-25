import 'react-swipeable-list/dist/styles.css';

import {
  SwipeAction,
  SwipeableList,
  SwipeableListItem,
  TrailingActions,
  Type,
} from 'react-swipeable-list';
import { chatBubbleIcon, chatDeleteIcon } from '../../assets/assets';
import { useEffect, useState } from 'react';

import ChatItem from '../../components/chat/ChatItem';
import CreateChatModal from '../../components/modal/CreateChatModal';
import DeleteChatModal from '../../components/modal/DeleteChatModal';
import Header from '../../components/common/Header';
import { useNavigate } from 'react-router-dom';

const StudentChatListPage = () => {
  //임시데이터(나중에)
  const [chatList, setChatList] = useState([
    {
      id: '1',
      roomName: 'Chat Room 1',
      lastMessage: 'Hello there!',
      lastMessageTime: '오전 9:10',
      showHelpRequest: true,
    },
    {
      id: '2',
      roomName: 'Chat Room 2',
      lastMessage: 'How are you?',
      lastMessageTime: '오후 2:45',
      showHelpRequest: false,
    },
  ]);
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<null | 'delete' | 'create'>(
    null
  );
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [deletingChatId, setDeletingChatId] = useState<string | null>(null);
  //스와이프와 클릭 분리
  const [isSwiping, setIsSwiping] = useState(false);
  const [canClick, setCanClick] = useState(true);

  useEffect(() => {
    let isPointerMoving = false; // pointermove 상태 추적
    let initialized = false; // 초기화 상태를 확인하는 플래그

    // 초기 상태 로그 출력
    console.log(
      'Initial State - isSwiping:',
      isSwiping,
      ', canClick:',
      canClick
    );

    const handlePointerMove = (e: PointerEvent) => {
      if (!initialized) return; // 초기화되지 않았다면 이벤트 무시
      if (!isPointerMoving && Math.abs(e.movementX) > 10) {
        console.log('Pointer is moving. Swiping started.');
        setIsSwiping(true);
        setCanClick(false); // 스와이프 중 클릭 차단
        isPointerMoving = true; // pointermove 상태 활성화
      }
    };

    const handlePointerUp = () => {
      if (!initialized) return; // 초기화되지 않았다면 이벤트 무시
      if (isPointerMoving) {
        console.log('Pointer is up. Swiping ended.');
        setTimeout(() => {
          console.log('Resetting isSwiping and canClick after timeout.');
          setIsSwiping(false); // 스와이프 종료
          setCanClick(true); // 클릭 가능 상태로 복구
          isPointerMoving = false; // pointermove 상태 비활성화
        }, 300); // 300ms 지연
      }
    };

    // 초기 상태 강제 설정
    setTimeout(() => {
      console.log('Initializing states...');
      setIsSwiping(false);
      setCanClick(true); // 초기 상태 강제 설정
      initialized = true; // 초기화 완료
    }, 100); // 100ms 딜레이

    // 이벤트 리스너 등록
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      // 이벤트 리스너 해제
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = (chatId: string) => {
    if (isSwiping || !canClick) {
      console.log('스와이프 중이거나 클릭이 차단된 상태입니다.');
      return;
    }
    navigate(`/student/chats/${chatId}`);
  };

  // 모달 열기
  const openDeleteModal = (id: string) => {
    setSelectedChatId(id);
    setActiveModal('delete');
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedChatId(null);
    setActiveModal(null);
  };

  // 삭제 로직
  const handleDeleteChat = () => {
    if (selectedChatId) {
      setDeletingChatId(selectedChatId); // 삭제 중인 아이템 설정
      setTimeout(() => {
        setChatList((prevChats) =>
          prevChats.filter((chat) => chat.id !== selectedChatId)
        );
        setDeletingChatId(null); // 삭제 완료 후 초기화
        closeModal(); // 모달 닫기
      }, 500); // 애니메이션 시간에 맞춰 설정
    }
  };

  // 생성 로직
  const handleCreateChat = (roomName: string) => {
    const newChat = {
      id: Date.now().toString(), // 고유 ID 생성
      // 나중에 서버보내주는 id 값 받아오는걸로 수정하기
      roomName,
      lastMessage: '',
      lastMessageTime: '',
      showHelpRequest: false,
    };
    setChatList((prev) => [...prev, newChat]); // 새로운 채팅방 추가
    setActiveModal(null); // 모달 닫기
    navigate(`/student/chats/${newChat.id}`); // 생성된 채팅방으로 이동
  };

  const trailingActions = (id: string) => (
    <TrailingActions>
      <SwipeAction
        onClick={() => {
          openDeleteModal(id); // 삭제 모달 열기
        }}
      >
        <button className='flex h-full w-[73px] items-center bg-deleteButtonColor p-[24px] text-center text-white'>
          <img src={chatDeleteIcon} alt='Delete chat' />
        </button>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <div className='flex h-full flex-col'>
      <Header
        title='수행평가 챗 리스트'
        rightElement={
          <img
            src={chatBubbleIcon}
            alt='Chat Bubble'
            onClick={() => setActiveModal('create')}
            className='cursor-pointer'
          />
        }
      />

      <div className='flex-grow overflow-y-auto'>
        <SwipeableList type={Type.IOS} fullSwipe={false}>
          {chatList.map((chat) => (
            <SwipeableListItem
              key={chat.id}
              trailingActions={trailingActions(chat.id)}
              fullSwipe={false}
              threshold={0.5}
            >
              <div
                className={`w-full ${
                  deletingChatId === chat.id ? 'animate-slideOutLeft' : ''
                } transition-transform`}
              >
                <ChatItem
                  roomName={chat.roomName}
                  lastMessage={chat.lastMessage}
                  lastMessageTime={chat.lastMessageTime}
                  showHelpRequest={chat.showHelpRequest}
                  onClick={() => handleClick(chat.id)}
                />
              </div>
            </SwipeableListItem>
          ))}
        </SwipeableList>
      </div>

      {/* 삭제 모달 */}
      {activeModal === 'delete' && (
        <DeleteChatModal onClose={closeModal} onDelete={handleDeleteChat} />
      )}

      {/* 추가 모달 (생성 모달 관련) */}

      {activeModal === 'create' && (
        <CreateChatModal
          onClose={() => setActiveModal(null)}
          onCreateChat={handleCreateChat}
        />
      )}
    </div>
  );
};

export default StudentChatListPage;
