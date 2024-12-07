export type ChatListData = {
  room_id: number;
  title: string;
  help_checked: boolean;
  recent_message: string;
  recent_update: string; 
  user_id: number;
};

export type ChatListResponse = {
  data: ChatListData[]; 
};
