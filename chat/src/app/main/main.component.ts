import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';

import { UserService } from '../core/service/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isRoom: boolean;
  constructor(private userService: UserService, 
    private route: ActivatedRoute,
  private router:Router) { }

  ngOnInit() {
    this.route.fragment.subscribe(res => {
      console.info(res, 'rrrrrrrrr');
    })
  }


  logout() {
    this.deleteConnection();
    this.router.navigateByUrl('/login');
  }

  /**
   * 返回大厅
   */
  backToLobby() {
    this.deleteConnection();
    this.router.navigateByUrl('/main/roomlist');
    this.isRoom=false;
  }

  /**
 * 断开连接
 */
  deleteConnection() {

  }
}
