import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ModalController } from 'ionic-angular';
import { ModalCartedPage } from '../../pages/modal-carted/modal-carted';

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController,
    public modalCtrl:ModalController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }


  selectSize()
  {
    console.log("fsfsfsfs");
  }

  tambahKeranjang(id)
  {
    //this.presentConfirm();
    console.log("modal");
    this.showConfirm();
  }

  showConfirm()
  {
    console.log("modal");
    let confirmModal = this.modalCtrl.create(ModalCartedPage);
    confirmModal.onDidDismiss(data => {

    });
    confirmModal.present();
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: 'Do you want to buy this book?',
      enableBackdropDismiss:false,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Buy',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }
}
