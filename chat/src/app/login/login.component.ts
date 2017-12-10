import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
// import { HttpService } from '../shared/service/http.service';
import { Md5 } from 'ts-md5/dist/md5';
import { Http } from '@angular/http';
import { UserService } from '../core/service/user.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { HttpService } from '../core/service/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], animations: [
    trigger('page', [
      state('login', style({
        transform: 'rotateY(0deg) translate(-50%,-50%)',
        // 'backface-visibility':'visible'  
      })),
      state('register', style({
        transform: 'rotateY(180deg) translate(-50%,-50%)'
      })),
      transition('login => register', animate('1000ms ease-out')),
      transition('register => login', animate('1000ms ease-in')),
    ])
  ]
})

export class LoginComponent implements OnInit, OnDestroy {
  username: string;
  password: string;
  constructor(private router: Router,
    private httpService: HttpService,
    private http: Http,
    private userService: UserService
  ) { }

  pageType: string = 'login';//页面类型：login／register

  ngOnInit() {
    // this.username=sessionStorage.getItem()
    // this.password="admin"
  }
  ngOnDestroy(): void {

  }

  login(event: any) {
    this.httpService.httpQuery('login', 'get', {
      data: {
        username: event.name,
        password: Md5.hashStr(event.pass)
      }
    }).subscribe(res => {
      this.userService.user = res;
      sessionStorage.setItem('user', res.username);
      sessionStorage.setItem('user_id', res.id);
      sessionStorage.setItem('isLogin', 'true');
      this.router.navigateByUrl('main');
    });

  }

  register(event:any) {
    // this.pageType='register';
  }

  toggle() {
    this.pageType = this.pageType == 'register' ? 'login' : 'register';
  }
}
