//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpserviceProvider } from '../httpservice/httpservice';
import { GlobaldataProvider } from '../globaldata/globaldata';

import 'rxjs/add/operator/map';

/*
  Generated class for the ProductServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductServiceProvider {

  constructor(public http: HttpserviceProvider) {
    console.log('Hello ProductServiceProvider Provider');
  }

  listProduk(body:any)
  {
    return  this.http.post('product.php',body);
  }

}
