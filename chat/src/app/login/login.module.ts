import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
// import { HttpService } from '../shared/service/http.service';
@NgModule({
  imports: [
    SharedModule,
    HttpModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent }
    ]),
  ],
  declarations: [LoginComponent],
  providers:[]
})
export class LoginModule { }
