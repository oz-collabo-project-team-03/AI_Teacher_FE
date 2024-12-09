export type CreateChatRoomRequestParams = {
  title: string;
};

export type ChatRoomResponseDto = {
  room_id: number;
  title: string;
  help_checked?: boolean;
  student_id?: number; 
  teacher_id?: number; 
  last_message?: string; 
  last_message_at?: string; 
  created_at?: string; 
  updated_at?: string; 
};

