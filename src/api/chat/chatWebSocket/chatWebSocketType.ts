export type ChatMessageType = {
    content: string; 
    message_type: 'text' | 'image';
    sender_id: number; 
    timestamp: string;
    user_type: 'student' | 'teacher' | 'ai' | 'system'; 
  }
  
  // WebSocket 연결 관련 이벤트 타입
  export type WebSocketEvent = {
    type: 'open' | 'close' | 'error' | 'message'; 
    payload?: any; 
  }
  