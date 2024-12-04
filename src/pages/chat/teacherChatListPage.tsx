import ChatItem from '../../components/chat/ChatItem';
import Header from '../../components/common/Header';
import { useGetChatHelpQuery } from '../../api/chat/chatHelpList/chatHelpList.hooks';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherChatListPage = () => {
  const navigate = useNavigate();
  const { data: chatList } = useGetChatHelpQuery(1);

  const handleClick = (roomId: string) => {
    navigate(`/teacher/chats/${roomId}`);
  };

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

  return (
    <div className='flex h-full flex-col pt-[72px]'>
      <Header title='최신 채팅' />
      <div className='custom-scrollbar flex-grow overflow-y-auto'>
        {recentlyChats?.map((chat) => (
          <ChatItem
            key={chat.room_id}
            roomName={chat.student_nickname}
            lastMessage={chat.recent_message}
            lastMessageTime={chat.recent_update}
            showHelpRequest={chat.help_checked}
            onClick={() => handleClick(chat.room_id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TeacherChatListPage;
