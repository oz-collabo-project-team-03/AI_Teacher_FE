export type ChatListData = {
  room_id: string;
  title: string;
  help_checked: boolean;
  recent_message: string;
  recent_update: string; 
  user_id: string;
};

export type ChatListResponse = {
  data: ChatListData[]; 
};
