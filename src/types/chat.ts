export type ChatBubbleProps = {
  message: string;
  message_type: message_type;
};

export type ChatMessageProps = {
  message: string;
  message_type: message_type;
  nickname: string; 
  profileImage: string;
  userType: UserType; 
};

export type UserType = 'student' | 'teacher' | 'ai' | 'System';
export type message_type = 'text' | 'image';