import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './login/login.component';
import { AuthGuard }                from './auth-guard.service';
import { SelectivePreloadingStrategy } from './core/service/selective-preloading-strategy.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', loadChildren: './login/login.module#LoginModule',data:{preload:true}},
      { path: 'main', loadChildren: './main/main.module#MainModule' ,  canLoad: [AuthGuard]},
      // { path: '**', redirectTo: 'login' },
    ],{ preloadingStrategy: SelectivePreloadingStrategy }),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
