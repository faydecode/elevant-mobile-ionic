import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { PengirimanPage } from '../../pages/pengiriman/pengiriman';
import { LoginserviceProvider } from '../../providers/loginservice/loginservice';
import { LoginPage } from '../login/login';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public login:LoginserviceProvider,
    public alertCtrl:AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  cekLogin()
  {
    this.login.cekLogin().then((isLoggedIn)=> {
      if(isLoggedIn) {
        this.gotoPengiriman();
      } else {
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: 'Anda belum melakukan login aplikasi',
          buttons: [{
            text: 'LOGIN',
            handler: data => {
              this.navCtrl.setRoot(LoginPage)
            }
          }]
        });
        alert.present();
      }
    });
  }

  gotoPengiriman()
  {
    this.navCtrl.push(PengirimanPage);
  }

}
