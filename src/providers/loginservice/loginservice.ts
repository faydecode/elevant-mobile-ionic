//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpserviceProvider } from '../httpservice/httpservice';
import { GlobaldataProvider } from '../globaldata/globaldata';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';

/*
  Generated class for the LoginserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginserviceProvider {

  

  constructor(public userData:Storage,public api:HttpserviceProvider,public global:GlobaldataProvider ) {
    console.log('Hello LoginserviceProvider Provider');
  }

  cekLogin() {
    return new Promise((resolve) =>  {
      this.userData.get('isLoggedIn').then((val) => {
        if(val != null) {
          if(val == 0) {
            console.log('isLoggedIn :',val);
            resolve(false);
          } else if(val == 1) {
            console.log('isLoggedIn :',val);
            resolve(true);
          }
        } else {
          resolve(false);
        }
      });
    });
  }

  saveLogin(resp:any) {
    this.userData.set('isLoggedIn',1);
    this.global._user = resp.user;
    console.log('global ',this.global._user);
  }

  logout() {
    this.userData.set('isLoggedIn',0);
    this.global._user = null;
  }

  doLogin(accountInfo:any)
  {
    
    let seq = this.api.post('login.php', accountInfo);

    /*seq
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        if(res.kode == 1) {
          //console.log(res.data);
          this.saveLogin(res.data);
        } else {
          this.global._user = null;
        }
      }, err => {
        console.error('ERROR', err);
      });
      */

    return seq;
  }

}
