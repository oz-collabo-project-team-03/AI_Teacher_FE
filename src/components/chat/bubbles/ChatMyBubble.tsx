import { ChatBubbleProps } from '../../../types/index';

const ChatMyBubble = ({ message }: ChatBubbleProps) => {
  return (
    <div className='flex justify-end'>
      {/* 말풍선 꼬리 */}
      <div className='max-w-[245px] rounded-[10px] bg-primaryColor p-[14px]'>
        <p className='break-words text-[14px] font-normal text-white'>
          {message}
        </p>
      </div>
      <div className='relative left-[-15px] h-0 w-0 border-[10px] border-b-transparent border-l-transparent border-r-transparent border-t-primaryColor'></div>
    </div>
  );
};

export default ChatMyBubble;
