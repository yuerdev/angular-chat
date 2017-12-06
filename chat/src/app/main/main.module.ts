import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { RoomComponent } from './room/room.component';
import { RoomListComponent } from './room-list/room-list.component';
// import { HttpService } from '../shared/service/http.service';
import { HttpModule } from '@angular/http';
import { DataListModule, SharedModule, ButtonModule, DialogModule ,InputTextModule, CheckboxModule} from 'primeng/primeng';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataListModule,
    ButtonModule,
    HttpModule,
    DialogModule,
    InputTextModule,
    CheckboxModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: MainComponent,
        children: [
          { path: '', redirectTo: 'roomlist' },
          { path: 'roomlist', component: RoomListComponent },
          { path: 'room/:id', component: RoomComponent },
        ]
      }
    ]),
  ],
  declarations: [MainComponent, ChatMessageComponent, RoomListComponent, RoomComponent],
  providers: []
})
export class MainModule { }
