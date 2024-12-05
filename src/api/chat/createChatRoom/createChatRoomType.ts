export type ChatRoomData = {
  room_id: string;
  title: string;
  help_checked?: boolean;
  student_id?: number; 
  teacher_id?: number; 
  last_message?: string; 
  last_message_at?: string; 
  created_at?: string; 
  updated_at?: string; 
};


export type CreateChatRoomResponse = {
  title: string;
};