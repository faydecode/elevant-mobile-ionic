import { Injectable } from '@angular/core';
import { HttpserviceProvider } from '../httpservice/httpservice';
import { GlobaldataProvider } from '../globaldata/globaldata';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

/*
  Generated class for the HomeserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HomeserviceProvider {

  constructor(public http: Http,public api:HttpserviceProvider) {
    console.log('Hello HomeserviceProvider Provider');
  }

  loadDashbobard()
  {
    let body:{FN:string} = { FN:'dashboard_menu' };
    //console.log('body',body);
    return this.api.post('homex.php',body);
  }

}
