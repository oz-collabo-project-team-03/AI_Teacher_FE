import axiosInstance from '@/api/axiosInstance';

export default class ChatWebSocketAPI {
  private socket: WebSocket | null = null;
  private roomId: number;
  private userId: number;

  constructor(roomId: number, userId: number) {
    this.roomId = roomId;
    this.userId = userId;

    const baseUrl = axiosInstance.defaults.baseURL || '';
    const wsUrl = `${baseUrl.replace(/^http:/, 'ws:')}ws/${this.roomId}/${this.userId}`;
    
    this.socket = new WebSocket(wsUrl);


    this.socket.onopen = () => {

    };

    this.socket.onclose = () => {

    };

    this.socket.onerror = () => {

    };
  }

  // 메시지 전송
  sendMessage(message: any) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      const content = typeof message === 'string' ? message : message?.content;
      if (content) {
        this.socket.send(content);
       
      } else {
       
      }
    } else {
     
    }
  }

  // 메시지 수신 이벤트 등록
  onMessage(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        callback(parsedData);
      };
    }
  }

  // WebSocket 닫기
  close() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}