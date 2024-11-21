import { ChatBubbleProps } from '../../../types/index';

const ChatAiBubble = ({ message }: ChatBubbleProps) => {
  return (
    <div className='flex'>
      {/* 말풍선 꼬리 */}
      <div className='h-0 w-0 border-[10px] border-b-transparent border-l-transparent border-r-transparent border-t-chatBubbleColor'></div>
      <div className='relative left-[-15px] max-w-[245px] rounded-[10px] bg-chatBubbleColor p-[14px]'>
        <p className='break-words text-[14px] font-normal text-textMainColor'>
          {message}
        </p>
      </div>
    </div>
  );
};

export default ChatAiBubble;
