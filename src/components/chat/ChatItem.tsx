import { format, isToday, parseISO } from 'date-fns';

type ChatItemProps = {
  roomName: string;
  lastMessage: string;
  lastMessageTime?: string;
  showHelpRequest: boolean;
  onClick?: () => void;
};

//팬딩어떻게 할꺼야 로딩 필요
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
      <div className='max-w-[calc(100%-65px)] overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-medium'>
        {roomName}
      </div>
      {showHelpRequest && (
        <div className='ml-2'>
          <span className='h-[22px] w-[57px] rounded-[4px] bg-helpButtonColor p-[6px] text-[14px] font-bold text-white'>
            Help!
          </span>
        </div>
      )}
    </div>
    <div className='mt-1 flex justify-between'>
      <div className='max-w-[65%] overflow-hidden text-ellipsis whitespace-nowrap text-[14px] text-chatText'>
        {lastMessage}
      </div>
      <div className='text-[14px] text-captionColor'>
        {formatLastMessageTime(lastMessageTime)}
      </div>
    </div>
  </div>
);

export default ChatItem;

const formatLastMessageTime = (lastMessageTime?: string) => {
  if (!lastMessageTime) {
    return '시간 정보 없음';
  }

  const parsedDate = parseISO(lastMessageTime);

  if (isToday(parsedDate)) {
    return format(parsedDate, 'HH시mm분');
  }

  return format(parsedDate, 'yyyy-MM-dd');
};
