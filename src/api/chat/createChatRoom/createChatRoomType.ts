export type CreateChatRoomResponse = {
  title: string;
};

export type ChatRoomData = {
  room_id: string;
  title: string;
  last_message: string;
  last_message_at: string;
  created_at: string;
  updated_at: string;
};
