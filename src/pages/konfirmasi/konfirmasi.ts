import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BuktiBayarPage } from '../../pages/bukti-bayar/bukti-bayar';

/**
 * Generated class for the KonfirmasiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-konfirmasi',
  templateUrl: 'konfirmasi.html',
})
export class KonfirmasiPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KonfirmasiPage');
  }

  gotoBukti()
  {
    this.navCtrl.push(BuktiBayarPage);
  }

}
