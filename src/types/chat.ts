export type UserType = 'student' | 'teacher' | 'ai' | 'system';
export type Message_type = 'text' | 'image';

export type ChatBubbleRequestParams = {
  message: string;
  message_type: Message_type;
};

export type ChatMessageRequestParams = {
  message: string;
  message_type: Message_type;
  filename?: string;
  nickname: string;
  profileImage: string;
  userType: UserType;
  timestamp?: string;
};

// 채팅방 Info
export type ChatRoomInfoResponseDto = {
  room_id: number;
  title: string;
  help_checked: boolean;
  teacher_nickname: string;
  student_nickname: string;
  messages: ChatMessageDetail[];
  
  ai_profile: string;
  teacher_profile: string;
  student_profile: string;
};

// 채팅내역
export type ChatMessageDetail =  {
  sender_id: number;
  content: string;
  filename?: string;
  timestamp: string;
  message_type: Message_type;
  user_type: UserType;
}

// 채팅내역 응답 타입
export type ChatMessagesResponseDto = {
  pagination: {
    next: number | null;
    previous: number | null;
  };
  posts: ChatRoomInfoResponseDto[];
};