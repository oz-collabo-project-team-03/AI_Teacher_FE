import { useEffect, useRef, useState } from 'react';

import ChatWebSocketAPI from './chatWebSocketAPI';

export const useChatWebSocket = (roomId: number, userId: number) => {
  const [lastMessage, setLastMessage] = useState<any>(null);
  const webSocketRef = useRef<ChatWebSocketAPI | null>(null);

  useEffect(() => {
    console.log('[useChatWebSocket] WebSocket 생성');
    const webSocket = new ChatWebSocketAPI(roomId, userId);
    webSocketRef.current = webSocket;
  
    webSocket.onMessage((data) => {
      setLastMessage(data);
      console.log('[useChatWebSocket] 메시지 수신:', data);
    });
  
    return () => {
      webSocket.close();
      console.log('[useChatWebSocket] WebSocket 종료');
    };
  }, [roomId, userId]);
  

  // 메시지 전송 함수
  const sendMessage = (message: any) => {
    webSocketRef.current?.sendMessage(message);
  };

  return { lastMessage, sendMessage };
};
