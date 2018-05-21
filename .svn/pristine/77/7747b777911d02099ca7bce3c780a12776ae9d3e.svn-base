import { Injectable } from '@angular/core';
import { $WebSocket,WebSocketSendMode } from 'angular2-websocket/angular2-websocket';
import { SOCKET_SERVE_URL } from "./Constants";
import {AlertController} from "ionic-angular";
@Injectable()
export class SocketService {
    public _socket;
    public _tradeSocket;

    get socket(){
        return this._socket;
    }
    set socket(url) {
        this._socket = new $WebSocket(url,null,JSON.parse('{"reconnectIfNotNormalClose": "true"}'));
        this._socket.setSend4Mode(WebSocketSendMode.Direct);
    }
    get tradeSocket(){
        return this._tradeSocket;
    }
    set tradeSocket(url) {
        this._tradeSocket = new $WebSocket(url,null,JSON.parse('{"reconnectIfNotNormalClose": "true"}'),'arraybuffer');
        // this._tradeSocket.setSend4Mode(WebSocketSendMode.Direct);
    }
    // if(!this.socket){
    //     this.socket = new $WebSocket(SOCKET_SERVE_URL,null,JSON.parse('{"reconnectIfNotNormalClose": "true"}'));
    // }

   
}