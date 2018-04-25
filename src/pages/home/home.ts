import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeserviceProvider } from '../../providers/homeservice/homeservice';
import { ProductPage } from '../product/product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tabmen:any;
  kategori:any[];

  constructor(public navCtrl: NavController,public homeService:HomeserviceProvider
  ) {
    this.tabmen = 'promo';
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

  openKategori(k)
  {
    //console.log(":fsfssf");
    this.navCtrl.push(ProductPage,{ id_kat_produk:k });
  }



}
