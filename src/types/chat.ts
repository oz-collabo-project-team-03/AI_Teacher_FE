export type ChatBubbleRequestParams = {
  message: string ;
  message_type: MessageType;
  filename?: string;
};

export type ChatMessageRequestParams = {
  message: string;
  message_type: MessageType;
  filename?: string;
  nickname: string;
  profileImage: string;
  userType: UserType;
  timestamp?: string;
};

// 채팅방 Info
export type ChatRoomInfoResponseDto= {
  room_id: number;
  title: string;
  help_checked: boolean;
  teacher_nickname: string;
  student_nickname: string;
  messages: ChatMessageDetail[];
  
  ai_profile: string;
  teacher_profile: string;
  student_profile: string;
  
  pagination: ChatPagination;
};

// 채팅내역
export type ChatMessageDetail= {
  sender_id: number;
  content: string;
  filename?: string;
  timestamp: string;
  message_type: MessageType; 
  user_type: UserType;
};

// 채팅 페이지네이션 타입
export type ChatPagination = {
  next: number | null;
  previous: number | null;
  total_messages: number; 
  total_pages: number;
};

export type UserType = 'student' | 'teacher' | 'ai' | 'system';
export type MessageType = 'text' | 'image';