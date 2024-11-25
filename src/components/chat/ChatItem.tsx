type ChatItemProps = {
  roomName: string;
  lastMessage: string;
  lastMessageTime: string;
  showHelpRequest: boolean;
  onClick?: () => void;
};

const ChatItem = ({
  roomName,
  lastMessage,
  lastMessageTime,
  showHelpRequest,
  onClick,
}: ChatItemProps) => (
  <div
    className='h-[73px] w-full cursor-pointer border-b border-commuInputColor p-[14px] hover:bg-commuInputColor'
    onClick={onClick}
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

export default ChatItem;
