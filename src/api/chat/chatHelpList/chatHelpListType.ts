export type ChatHelpListData = {
  room_id: number;
  student_id: number;
  student_nickname: string;
  help_checked: boolean;
  recent_message: string;
  recent_update: string;
};

export type ChatHelpListResponse = {
  data: ChatHelpListData[];
};