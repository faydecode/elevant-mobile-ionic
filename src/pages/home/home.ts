import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeserviceProvider } from '../../providers/homeservice/homeservice';
import { ProductPage } from '../product/product';
import { GlobaldataProvider } from '../../providers/globaldata/globaldata';
import { CartPage } from '../cart/cart';
//import { MyApp } from '../../app/app.component';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tabmen:any;
  kategori:any[];
  count:string='';

  constructor(public navCtrl: NavController,public homeService:HomeserviceProvider,public cartSrv:GlobaldataProvider
  ) {
    this.tabmen = 'beranda';
  }

  ionViewDidLoad()
  {
    this.homeService.loadDashbobard()
    .map(res => res.json())
    .subscribe(res => {
      this.kategori = res.data;
      console.log('data dash',this.kategori);
    });
    
  }

  ionViewDidEnter()
  {
    setTimeout(() => {
      this.cartSrv.getCountItem().then((res)=>{
        console.log('jumlah item', res);
        if(res != '0')
        {
          this.count = String(res);
        }
        
      });  
    }, 1000);
  }

  openKategori(k)
  {
    //console.log(":fsfssf");
    this.navCtrl.push(ProductPage,{ kategori:k });
  }

  gotoCart()
  {
    this.navCtrl.push(CartPage);
  }



}
