import ChatItem from '../../components/chat/ChatItem';
import Header from '../../components/common/Header';
import { useNavigate } from 'react-router-dom';

// 임시데이터>나중에 삭제하기
const chatList = [
  {
    id: '1',
    nickname: '경원핑',
    lastMessage: 'Hello there!',
    lastMessageTime: '오전 9:10',
    showHelpRequest: true,
  },
  {
    id: '2',
    nickname: '현주핑',
    lastMessage: 'How are you?',
    lastMessageTime: '오후 2:45',
    showHelpRequest: true,
  },
];

const TeacherChatListPage = () => {
  const navigate = useNavigate();

  const handleClick = (chatId: string) => {
    navigate(`/teacher/chats/${chatId}`);
  };

  return (
    <div className='flex h-full flex-col pt-[72px]'>
      <Header title='최신 채팅' />
      <div className='flex-grow overflow-y-auto scrollbar-hide'>
        {chatList.map((chat) => (
          <ChatItem
            key={chat.id}
            roomName={chat.nickname}
            lastMessage={chat.lastMessage}
            lastMessageTime={chat.lastMessageTime}
            showHelpRequest={chat.showHelpRequest}
            onClick={() => handleClick(chat.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TeacherChatListPage;
