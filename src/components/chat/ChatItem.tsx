import React from 'react';
import { useNavigate } from 'react-router-dom';

type ChatItemProps = {
  id: string;
  roomName: string;
  lastMessage: string;
  lastMessageTime: string;
  showHelpRequest?: boolean;
};

const ChatItem: React.FC<ChatItemProps> = ({
  id,
  roomName,
  lastMessage,
  lastMessageTime,
  showHelpRequest,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/student/chats/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className='h-[73px] w-full cursor-pointer border-b border-commuInputColor p-[14px] hover:bg-commuInputColor'
    >
      <div className='flex'>
        <div className='text-[16px] font-medium'>{roomName}</div>
        {showHelpRequest && (
          <div className='ml-2'>
            <span className='h-[22px] w-[57px] rounded-[4px] bg-helpButtonColor p-[6px] text-[14px] font-bold text-white'>
              Help!
            </span>
          </div>
        )}
      </div>
      <div className='mt-1 flex justify-between'>
        <div className='text-[14px] text-chatText'>{lastMessage}</div>
        <div className='text-[14px] text-captionColor'>{lastMessageTime}</div>
      </div>
    </div>
  );
};

export default ChatItem;
