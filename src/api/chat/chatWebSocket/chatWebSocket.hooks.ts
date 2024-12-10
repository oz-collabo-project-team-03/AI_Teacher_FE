import { useEffect, useRef, useState } from 'react';

import ChatWebSocketAPI from './chatWebSocketAPI';

export const useChatWebSocket = (roomId: number, userId: number) => {
  const [lastMessage, setLastMessage] = useState<any>(null);
  const webSocketRef = useRef<ChatWebSocketAPI | null>(null);

  useEffect(() => {
    
    const webSocket = new ChatWebSocketAPI(roomId, userId);
    webSocketRef.current = webSocket;
  
    webSocket.onMessage((data) => {
      setLastMessage(data);
     
    });
  
    return () => {
      webSocket.close();
     
    };
  }, [roomId, userId]);
  

  // 메시지 전송 함수
  const sendMessage = (message: any) => {
    
    webSocketRef.current?.sendMessage(message);
  };

  return { lastMessage, sendMessage };
};