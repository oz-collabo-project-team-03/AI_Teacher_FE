export type UserType = 'student' | 'teacher' | 'ai' | 'system';
export type Message_type = 'text' | 'image';

export type ChatBubbleRequestParams = {
  message: string;
  message_type: Message_type;
};

export type ChatMessageRequestParams = {
  message: string;
  message_type: Message_type;
  nickname: string;
  profileImage: string;
  userType: UserType;
  timestamp?: string;
};

export type ChatRoomInfoResponseDto = {
  room_id: number;
  title: string;
  help_checked: boolean;
  teacher_nickname: string;
  student_nickname: string;
  messages: ChatMessageResponseDto[];
  
  ai_profile: string;
  teacher_profile: string;
  student_profile: string;
};

export type ChatMessageResponseDto =  {
  sender_id: number;
  content: string;
  filename?: string;
  timestamp: string;
  message_type: Message_type;
  user_type: UserType;
}
