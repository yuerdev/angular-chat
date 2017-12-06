import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import-gurd';
import { UserService } from './service/user.service';
import { SelectivePreloadingStrategy } from './service/selective-preloading-strategy.service';
import { HttpService } from './service/http.service';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
  ],
  declarations: [],
  exports: [],
  providers: [UserService, SelectivePreloadingStrategy, HttpService],
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
