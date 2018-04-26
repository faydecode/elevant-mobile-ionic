//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http, RequestOptions, URLSearchParams,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ContentType } from '@angular/http/src/enums';
/*
  Generated class for the HttpserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpserviceProvider {
  url: string;
  onDevice: boolean;
  private success: boolean = true;

  constructor(public http: Http,public platform:Platform) {
    console.log('Hello HttpserviceProvider Provider');
    this.onDevice = this.platform.is('cordova');
    if(this.onDevice) {
      this.url = 'http://sis.kurniacopier.com/eduhouse/mobile';
    } else {
      this.url = 'http://localhost/elevant-web-panel/api';
    }
  }

  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for(let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    return this.http.get(this.url + '/' + endpoint, options);
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let option = new RequestOptions({ headers: headers });


    return this.http.post(this.url + '/' + endpoint, body, option);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(this.url + '/' + endpoint, body, options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

}
