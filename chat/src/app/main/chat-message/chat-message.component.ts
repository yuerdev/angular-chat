import { Component, OnInit, Input } from '@angular/core';
import { Message } from './message.model';
import { UserService } from '../../core/service/user.service';

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

  @Input() message: Message;
  iconPosition:   'left' | 'right';
  currentUser_id:any;

  constructor(private userServie:UserService) {
    this.currentUser_id=sessionStorage.getItem('user_id');
   }
  ngOnInit() {
  }

}
