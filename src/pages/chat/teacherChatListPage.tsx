import ChatItem from '../../components/chat/ChatItem';
import Header from '../../components/common/Header';
import { useGetChatHelpQuery } from '../../api/chat/chatHelpList/chatHelpList.hooks';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatListSkeleton from '@/components/chat/ChatListSkeleton';
import LoadingPage from '../status/loadingPage';

const TeacherChatListPage = () => {
  const navigate = useNavigate();
  const { data: chatList, isPending, isLoading } = useGetChatHelpQuery(1);

  const handleClick = (roomId: number) => {
    navigate(`/teacher/chats/${roomId}`);
  };

  // 최신순으로 정렬된 채팅 목록
  const sortedChatList = useMemo(() => {
    if (!chatList) return [];
    return [...chatList].sort((a, b) => {
      const timeA = new Date(a.recent_update).getTime();
      const timeB = new Date(b.recent_update).getTime();
      return timeB - timeA; // 내림차순 정렬
    });
  }, [chatList]);

  if (isLoading) return <LoadingPage />;
  return (
    <div className='flex h-full flex-col pt-[72px]'>
      <Header title='최신 채팅' />
      <div className='custom-scrollbar flex-grow overflow-y-auto'>
        {isPending ? (
          <ChatListSkeleton />
        ) : (
          <>
            {sortedChatList.map((chat) => (
              <ChatItem
                key={chat.room_id}
                roomName={chat.student_nickname}
                lastMessage={chat.recent_message}
                lastMessageTime={chat.recent_update}
                showHelpRequest={chat.help_checked}
                onClick={() => handleClick(chat.room_id)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TeacherChatListPage;
