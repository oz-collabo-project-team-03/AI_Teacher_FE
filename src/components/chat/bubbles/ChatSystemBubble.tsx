import { ChatBubbleRequestParams } from '../../../types/index';

export const ChatSystemBubble = ({ message }: ChatBubbleRequestParams) => {
  return (
    <div className={`py-[20px] text-center text-[12px] text-captionColor`}>
      {message}
    </div>
  );
};
