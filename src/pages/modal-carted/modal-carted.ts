import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { CartPage } from '../../pages/cart/cart';


/**
 * Generated class for the ModalCartedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-carted',
  templateUrl: 'modal-carted.html',
})
export class ModalCartedPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalCartedPage');
  }


  gotoCart()
  {
    this.navCtrl.push(CartPage);
  }

  gotoHome()
  {
    this.navCtrl.setRoot(HomePage);
  }
}
