import 'react-swipeable-list/dist/styles.css';

import {
  SwipeAction,
  SwipeableList,
  SwipeableListItem,
  TrailingActions,
  Type,
} from 'react-swipeable-list';
import { chatBubbleIcon, chatDeleteIcon } from '@/assets/assets';
import { useEffect, useMemo, useState } from 'react';

import ChatItem from '@/components/chat/ChatItem';
import CreateChatModal from '@/components/modal/CreateChatModal';
import DeleteChatModal from '@/components/modal/DeleteChatModal';
import Header from '@/components/common/Header';
import { useCreateChatRoomMutation } from '@/api/chat/createChatRoom/createChatRoom.hooks';
import { useDeleteChatRoomMutation } from '@/api/chat/deleteChatRoom/deleteChatRoom.hooks';
import { useGetChatListQuery } from '@/api/chat/chatList/chatList.hooks';
import { useNavigate } from 'react-router-dom';

const StudentChatListPage = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<null | 'delete' | 'create'>(
    null
  );
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [deletingChatId, setDeletingChatId] = useState<string | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [canClick, setCanClick] = useState(true);

  // 페이지네이션를 다룰때 useInfiniteQuery 쓰기 (캡쳐사진있음)
  // refetch vs invalidate cache 차이 숙제 > refetch잘안씀 이유가 뭐지
  const { data: chatList, refetch: refetchChatList } = useGetChatListQuery(1);

  const createChatRoomMutation = useCreateChatRoomMutation({
    onSuccess: (newChatRoom) => {
      if (!newChatRoom.room_id) {
        console.error('room_id가 없습니다:', newChatRoom);
        alert('채팅방 생성에 실패했습니다.');
        return;
      }

      // 채팅방 페이지로 이동
      navigate(`/student/chats/${newChatRoom.room_id}`);
      setActiveModal(null);
    },
    onError: (error) => {
      console.error('Error in onError:', error);
      alert(`채팅방 생성 실패: ${error.message}`);
    },
  });

  const deleteChatRoomMutation = useDeleteChatRoomMutation({
    onSuccess: () => {
      refetchChatList();
      setDeletingChatId(null);
      closeModal();
    },
    onError: (error) => {
      alert(`채팅방 삭제 실패: ${error.message}`);
    },
  });

  //프레이머 모션 스와이퍼 에있음 찾아보기
  useEffect(() => {
    let isPointerMoving = false;
    let initialized = false;
    let startX = 0;
    let swipeDistance = 0;

    const handlePointerDown = (e: PointerEvent) => {
      startX = e.clientX;
      swipeDistance = 0;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isPointerMoving) {
        swipeDistance = Math.abs(e.clientX - startX);
        if (swipeDistance > 10) {
          setIsSwiping(true);
          setCanClick(false);
          isPointerMoving = true;
        }
      }
    };

    const handlePointerUp = () => {
      if (!initialized) return;
      if (isPointerMoving) {
        const delay = swipeDistance > 50 ? 500 : 300;
        setTimeout(() => {
          setIsSwiping(false);
          setCanClick(true);
          isPointerMoving = false;
        }, delay);
      }
    };

    setTimeout(() => {
      setIsSwiping(false);
      setCanClick(true);
      initialized = true;
    }, 100);

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  // 최신순 내림차순
  const recentlyChats = useMemo(() => {
    if (!chatList) return [];

    return [...chatList].sort((a, b) => {
      const parseDate = (dateStr: string | null | undefined) => {
        if (!dateStr) return null;

        const cleanedDateStr = dateStr
          .replace('시', ':')
          .replace('분', '')
          .trim();
        const date = new Date(cleanedDateStr);
        return isNaN(date.getTime()) ? null : date;
      };

      const dateA = parseDate(a.recent_update);
      const dateB = parseDate(b.recent_update);

      if (!dateA && !dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;

      return dateB.getTime() - dateA.getTime();
    });
  }, [chatList]);

  const handleClick = (chatId: string) => {
    if (isSwiping || !canClick) return;
    navigate(`/student/chats/${chatId}`);
  };

  const openDeleteModal = (id: string) => {
    setSelectedChatId(id);
    setActiveModal('delete');
  };

  const closeModal = () => {
    setSelectedChatId(null);
    setActiveModal(null);
  };

  const handleDeleteChat = () => {
    if (selectedChatId) {
      setDeletingChatId(selectedChatId);
      deleteChatRoomMutation.mutate({ room_id: selectedChatId });
    }
  };

  const handleCreateChat = (roomName: string) => {
    createChatRoomMutation.mutate({
      title: roomName,
    });
  };

  const trailingActions = (id: string) => (
    <TrailingActions>
      <SwipeAction onClick={() => openDeleteModal(id)}>
        <button className='flex h-full w-[73px] items-center bg-deleteButtonColor p-[24px] text-center text-white'>
          <img src={chatDeleteIcon} alt='Delete chat' />
        </button>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <div className='flex h-full flex-col pt-[72px]'>
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

      <div className='custom-scrollbar flex-grow overflow-y-auto'>
        <SwipeableList type={Type.IOS} fullSwipe={false}>
          {recentlyChats?.map((chat) => (
            <SwipeableListItem
              key={chat.room_id}
              trailingActions={trailingActions(chat.room_id)}
              fullSwipe={false}
              threshold={0.5}
            >
              {/* 하나 더 div 로 감싸서 해보기 */}
              <div
                className={`w-full ${
                  deletingChatId === chat.room_id ? 'animate-slideOutLeft' : ''
                } transition-transform`}
              >
                <ChatItem
                  roomName={chat.title}
                  lastMessage={chat.recent_message}
                  lastMessageTime={chat.recent_update}
                  showHelpRequest={chat.help_checked}
                  onClick={() => handleClick(chat.room_id)}
                />
              </div>
            </SwipeableListItem>
          ))}
        </SwipeableList>
      </div>

      {activeModal === 'create' && (
        <CreateChatModal
          onClose={() => setActiveModal(null)}
          onCreateChat={handleCreateChat}
        />
      )}

      {activeModal === 'delete' && (
        <DeleteChatModal onClose={closeModal} onDelete={handleDeleteChat} />
      )}
    </div>
  );
};

export default StudentChatListPage;
