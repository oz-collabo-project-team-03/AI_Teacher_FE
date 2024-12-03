import { format, isToday, parse } from 'date-fns';

type ChatItemProps = {
  roomName: string;
  lastMessage: string;
  lastMessageTime: string;
  showHelpRequest: boolean;
  onClick?: () => void;
};

const formatLastMessageTime = (
  lastMessageTime: string | null | undefined
): string => {
  if (!lastMessageTime) {
    // null 또는 undefined일 경우 기본값 반환
    return '시간 정보 없음';
  }

  try {
    // 날짜 파싱
    const parsedDate = parse(
      lastMessageTime,
      'yyyy-MM-dd HH시mm분',
      new Date()
    );

    // 오늘 날짜인지 확인
    if (isToday(parsedDate)) {
      return format(parsedDate, 'HH시mm분');
    } else {
      return format(parsedDate, 'yyyy-MM-dd');
    }
  } catch (error) {
    console.error('Error parsing date:', lastMessageTime, error);
    // 파싱 오류 시 기본값 반환
    return '잘못된 날짜 형식';
  }
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
