import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../core/service/http.service';
import { Room } from '../model/room.model';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  display:boolean;
  isPassword:boolean;
  room:Room;
  constructor(private router: Router,
    private httpService: HttpService
  ) { }
  room_list: any[];
  ngOnInit() {
    this.room_list = [];
    let url = 'user/getRoomList'
    this.httpService.httpQuery(url, 'get').subscribe(res => {
      this.room_list = res || [];
      console.info(res);
    });
  this.room={};
  }
  gotoRoom(event: any, room: any) {
    event.preventDefault();
    this.router.navigate(['main/room', room.id]);
  }

  addRoom(){
    this.display=false;
  
  }

  cancel(){
    this.display=false;
      
  }

}
