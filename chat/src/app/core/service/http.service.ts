import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpService {
  apiBase: string = "http://127.0.0.1:3000/";
  headers: Headers;
  constructor(private http: Http) {
    // this.http.get('assets/apiConfig').map(res => {
    //   this.apiBase = res.json().apiBase
    // }).catch(err => this.handleError(err));
  }

  /**
   * 
   * @param url 
   * @param methed get|post|put|delete|options
   * @param body 
   */
  httpQuery(url: string, methed: string, body?: any, options?: RequestOptionsArgs): Observable<any> {
    url = this.apiBase + url;
    console.info('===', this.apiBase, url);
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    let data: Observable<any>;
    switch (methed) {
      case 'get':
        if (body&&body.data)
          url += this.jointparam(body.data);
        data = this.http.get(url).map(res => res.json().data).catch(err => this.handleError(err));
        break;
      case 'post':
        data = this.http.post(url, body).map(res => res.json()).catch(err => this.handleError(err));
        break;
      case 'put':
        data = this.http.put(url, body).map(res => res.json()).catch(err => this.handleError(err));
        break;
      case 'delete':
        data = this.http.delete(url, body).map(res => res.json()).catch(err => this.handleError(err));
        break;
      case 'options':
        data = this.http.options(url).map(res => res.json()).catch(err => this.handleError(err));
        break;
      default:
        break;
    }
    return data;
  }

  jointparam(param: any) {
    let str = "";
    for (var key in param) {
      str = str + key + '=' + param[key] + '&';
    }
    return '?' + str.substring(0, str.length - 1);
  }

  private handleError(error: any): Observable<any> {
    return error.error;
  }
}
