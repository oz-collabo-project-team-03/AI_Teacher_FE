import { chatBubbleIcon, chatDeleteIcon } from '@/assets/assets';
import { useMemo, useState } from 'react';

import ChatItem from '@/components/chat/ChatItem';
import CreateChatModal from '@/components/modal/CreateChatModal';
import DeleteChatModal from '@/components/modal/DeleteChatModal';
import Header from '@/components/common/Header';
import { motion } from 'framer-motion';
import { useCreateChatRoomMutation } from '@/api/chat/createChatRoom/createChatRoom.hooks';
import { useDeleteChatRoomMutation } from '@/api/chat/deleteChatRoom/deleteChatRoom.hooks';
import { useGetChatListQuery } from '@/api/chat/chatList/chatList.hooks';
import { useNavigate } from 'react-router-dom';
import ChatListSkeleton from '@/components/chat/ChatListSkeleton';
import LoadingPage from '../status/loadingPage';

const StudentChatListPage = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<null | 'delete' | 'create'>(
    null
  );

  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [, setDeletingRoomId] = useState<number | null>(null);

  // 페이지네이션를 다룰때 useInfiniteQuery 쓰기 (캡쳐사진있음)
  // refetch vs invalidate cache 차이 숙제 > refetch잘안씀 이유가 뭐지
  const {
    data: chatList,
    refetch: refetchChatList,
    isPending,
    isLoading,
  } = useGetChatListQuery(1);

  const [draggingRoomId, setDraggingRoomId] = useState<number | null>(null);

  const trailingActions = (roomId: number) => (
    <motion.div
      className='flex h-full items-center bg-deleteButtonColor'
      initial={{ x: '100%' }}
      animate={{ x: draggingRoomId === roomId ? '0%' : '100%' }}
      transition={{ duration: 0.8 }}
    >
      <button
        className='group flex h-full w-[73px] items-center justify-center p-[24px] text-center text-white'
        onClick={(e) => {
          e.stopPropagation();
          openDeleteModal(roomId);
        }}
        disabled={draggingRoomId === roomId}
      >
        <motion.img
          src={chatDeleteIcon}
          alt='Delete chat'
          className='transition-transform duration-300 group-hover:scale-110'
        />
      </button>
    </motion.div>
  );

  // 최신순으로 내림차순 정렬
  const sortedChatList = useMemo(() => {
    if (!chatList) return [];
    return [...chatList].sort((a, b) => {
      const timeA = new Date(a.recent_update).getTime();
      const timeB = new Date(b.recent_update).getTime();
      return timeB - timeA;
    });
  }, [chatList]);

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
      setDeletingRoomId(null);
      closeModal();
    },
    onError: (error) => {
      alert(`채팅방 삭제 실패: ${error.message}`);
    },
  });

  const handleClick = (roomId: number) => {
    navigate(`/student/chats/${roomId}`);
  };

  const openDeleteModal = (id: number) => {
    setSelectedRoomId(id);
    setActiveModal('delete');
  };

  const closeModal = () => {
    setSelectedRoomId(null);
    setActiveModal(null);
  };

  const handleDeleteChat = () => {
    if (selectedRoomId !== null) {
      setDeletingRoomId(selectedRoomId);
      deleteChatRoomMutation.mutate({ room_id: selectedRoomId });
    } else {
      console.error('selectedRoomId가 null입니다.');
    }
  };

  const handleCreateChat = (roomName: string) => {
    createChatRoomMutation.mutate({
      title: roomName,
    });
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div className='flex h-full flex-col pt-[72px]'>
      <Header
        title='수행평가 챗 리스트'
        rightElement={
          <motion.img
            src={chatBubbleIcon}
            alt='Chat Bubble'
            onClick={() => setActiveModal('create')}
            className='cursor-pointer'
          />
        }
      />
      <div className='custom-scrollbar flex-grow overflow-y-auto overflow-x-hidden'>
        {isPending ? (
          <ChatListSkeleton />
        ) : (
          sortedChatList.map((chat) => (
            <motion.div
              key={chat.room_id}
              className='relative w-full'
              drag='x'
              dragConstraints={{ left: -73, right: 0 }}
              dragElastic={0.2}
              onDragStart={() => setDraggingRoomId(chat.room_id)}
              onDragEnd={() => setDraggingRoomId(null)}
            >
              <motion.div
                className={'absolute left-0 top-0 h-full w-full bg-white'}
                onClick={() => {
                  if (draggingRoomId === null) handleClick(chat.room_id);
                }}
              >
                <ChatItem
                  roomName={chat.title}
                  lastMessage={chat.recent_message}
                  lastMessageTime={chat.recent_update}
                  showHelpRequest={chat.help_checked}
                />
              </motion.div>

              {trailingActions(chat.room_id)}
            </motion.div>
          ))
        )}
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
