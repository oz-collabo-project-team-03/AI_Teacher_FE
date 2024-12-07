export type UserType = 'student' | 'teacher' | 'ai' | 'system';
export type message_type = 'text' | 'image';

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
  timestamp?: string;
};

export type ChatMessageResponse = {
  messages: ChatMessageProps[];
  title: string;
  teacher_nickname?: string;
  teacher_profile?: string;
  ai_profile?: string;
  has_next_page: boolean; // 페이지 여부 속성 추가
  help_checked: boolean;
};


export type ChatMessageType =  {
  sender_id: number;
  content: string;
  timestamp: string;
  message_type: message_type;
  user_type: UserType;
}
