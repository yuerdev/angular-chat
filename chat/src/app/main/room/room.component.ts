import { Component, OnInit } from '@angular/core';
import * as io from "socket.io-client";
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import 'rxjs/add/operator/switchMap';
import { ParamMap } from '@angular/router/src/shared';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { HttpService } from '../../core/service/http.service';
// import { Message } from './chat-message/message.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit ,OnDestroy{

  socket: any;
  message: string;
  messages: any[];
  user_list: any[];
  room_id: number;
  user_id: number;
  apiBase = '127.0.0.1:3000/';
  constructor(private route: ActivatedRoute,
    private httpService: HttpService
  ) {

  }

  ngOnInit() {
    this.user_id = parseInt(sessionStorage.getItem('user_id'));
    this.user_list = [];
    this.messages = [];
    let url = 'user/queryMessage';
    this.route.paramMap.switchMap((params: ParamMap) => {
      return null;
    });
    this.route.params.subscribe(param => {
      this.room_id = param.id;
      this.httpService.httpQuery(url, 'get', {
        data: {
          room_id: this.room_id
        }
      }).subscribe(res => {
        console.info(res);
        res.forEach(msg => {
          this.messages.push(msg);
        });
      });
      this.connectSocket();
    });
  }

  ngOnDestroy(): void {
    // this.socket.on('disconnect');
  }

  connectSocket() {
    this.socket = io.connect(this.apiBase);
    this.socket.emit('join', { username: sessionStorage.getItem('user'), room_id: this.room_id });
    this.socket.on('chat message', function (msg) {
    });
    this.socket.on('user_list', (msg) => {
      this.user_list = msg;
      console.info(this.user_list, '===');
    });
    this.socket.on('connet', (msg) => {
      this.messages.push({ isSystemMessage: true, text: `${msg.name}上线了` });
    })
    this.socket.on('room_message', (msg) => {
      console.info(msg);
      this.getUserInformation(msg);
      this.messages.push({ id: msg.send_id, username: 'admin', incoming: true, isSystemMessage: false, text: msg.text, timestamp: 2017 });
    })
  }

  /**
   * 获取消息用户的头像和昵称消息
   * @param user_id 
   */
  getUserInformation(user_id) {
    //这要做缓存，用户信息缓存有就直接取缓存，没有再查，数据库没就用默认头像
  }

  sendToRoom() {
    //滚动条在最下方
    setTimeout(() => {
      const scrollPanel = $('.msg-container');
      scrollPanel.animate({ scrollTop: scrollPanel[0].scrollHeight });
    });
    this.socket.emit('say',
      {
        send_id: sessionStorage.getItem('user_id'),
        room_id: this.room_id,
        text: this.message
      });
    this.messages.push({ id: 1, send_id: this.user_id, username: 'admin', incoming: false, isSystemMessage: false, text: this.message, timestamp: 2017 });
    this.message = '';
    return false;
  }

  keyDown(e) {
    var ev = window.event || e;
    if (ev.keyCode == 13) {
      this.sendToRoom();
    }
  }


}
