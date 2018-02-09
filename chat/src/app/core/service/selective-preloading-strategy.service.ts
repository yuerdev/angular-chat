import { Injectable } from '@angular/core';
import { PreloadingStrategy } from '@angular/router/src/router_preloader';
import { Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class SelectivePreloadingStrategy implements PreloadingStrategy {

  /**
 * 预加载
 * @param route 
 * @param load 
 */
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      return load();
    } else {
      return Observable.of(null);
    }
  }
}
