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
    // console.log(userId );
    // console.log(wsUrl);
    // this.socket.onopen = () => {
    //   console.log('WebSocket 연결 성공');
    // };

    // this.socket.onclose = () => {
    //   console.log('WebSocket 연결 종료');
    // };

    this.socket.onerror = () => {
      console.error('WebSocket 에러있음 재연결중');
    };
  }

  // 메시지 전송
  sendMessage(message: any) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      const content = typeof message === 'string' ? message : message?.content;
      if (content) {
        this.socket.send(content);
        // console.log('[WebSocket 전송 메시지]', content);
      } else {
        console.error('전송할 메시지 내용이 없습니다.', message);
      }
    } else {
      console.error('WebSocket 연결이 열려 있지 않습니다.');
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