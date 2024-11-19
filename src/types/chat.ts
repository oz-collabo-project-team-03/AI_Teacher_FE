export type ChatBubbleProps = {
    message: string;
  };


export type ChatMessageProps = {
  message: string;
  nickname: string;
  profileImage: string;
  isMe: boolean;
  userType: 'ai' | 'teacher' | 'user' | 'system';
};