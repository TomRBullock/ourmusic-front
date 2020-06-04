import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {RoomComponent} from '../../room/room.component';
import {environment} from '../../../environments/environment';

export class WebSocketBuilder {
  webSocketEndPoint: string = environment.baseUrl + '/ws';
  stompClient: any;

  constructor(){
    console.log("Initialize WebSocket Connection: " + this.webSocketEndPoint);
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = null
  }

  _connect(): any {
    return this.stompClient;
  };

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  /**
   * Send message to sever via web socket
   * @param {*} message
   */
  // _send(message) {
  //   console.log("calling logout api via web socket");
  //   this.stompClient.send("/app/current-song", {}, JSON.stringify(message));
  // }
  //
  // onMessageReceived(message) {
  //   // console.log("Message Recieved from Server :: " + message);
  //   this.component.handleMessage(JSON.stringify(message.body));
  // }
}
