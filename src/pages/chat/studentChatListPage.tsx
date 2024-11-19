import ChatItem from '../../components/chat/ChatItem';
import CreateChatModal from '../../components/modal/CreateChatModal';
import Header from '../../components/common/Header';
import { chatBubbleIcon } from '../../assets/assets';
import { useState } from 'react';

// 임시데이터>나중에 삭제하기
const chatList = [
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
];

const StudentChatListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='flex h-full flex-col'>
      <Header
        title='수행평가 챗 리스트'
        rightElement={
          <img
            src={chatBubbleIcon}
            alt='Chat Bubble'
            onClick={openModal}
            className='cursor-pointer'
          />
        }
      />

      <div className='scrollbar-hide flex-grow overflow-y-auto'>
        {chatList.map((chat) => (
          <ChatItem
            key={chat.id}
            id={chat.id}
            roomName={chat.roomName}
            lastMessage={chat.lastMessage}
            lastMessageTime={chat.lastMessageTime}
            showHelpRequest={chat.showHelpRequest}
          />
        ))}
      </div>

      {isModalOpen && <CreateChatModal onClose={closeModal} />}
    </div>
  );
};

export default StudentChatListPage;
