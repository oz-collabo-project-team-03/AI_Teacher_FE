export type ChatBubbleProps = {
    message: string;
  };


  export type ChatMessageProps = {
    message: string;
    nickname: string;
    profileImage?: string;
    isMe: boolean;
    userType: 'user' | 'ai' | 'teacher' | 'system';
    isLast?: boolean; // system 만 사용
  };
  