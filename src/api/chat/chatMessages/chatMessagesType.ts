export type UserType = 'student' | 'teacher' | 'ai' | 'System';
export type message_type = 'text' | 'image';

export type Message = {
  sender_id: string;
  content: string;
  timestamp: string;
  message_type: message_type;
  user_type: UserType;
};

export type ChatRoom = {
  room_id: string;
  title: string;
  help_checked: boolean;
  messages: Message[];
};

export type ChatMessageParams = {
  room_id: string;
  page: number;
  page_size: number;
};

export type ChatMessageResponse = {
  room_id: string;
  title: string;
  help_checked: boolean;
  messages: Message[];
  student_nickname: string;
  teacher_nickname: string;
  
  student_profile: string;
  teacher_profile: string;
  ai_profile: string;
  pagination: {
    current_page: number;
    total_pages: number;
    total_messages: number;
  };
};

