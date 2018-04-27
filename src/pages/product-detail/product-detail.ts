import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ModalController } from 'ionic-angular';
import { ModalCartedPage } from '../../pages/modal-carted/modal-carted';
import { ProductServiceProvider } from '../../providers/product-service/product-service';

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

  images:any[];
  ukuran:any[];
  id_produk:string;
  produk:any = {};
  size:any;
  buttonColor: string = '#FFF'; //Default Color

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController,
    public modalCtrl:ModalController, public prodServ:ProductServiceProvider
  ) {
    
    this.id_produk = navParams.get('id_produk');
    console.log('idproddd',this.id_produk);
    
    this.listImage();
    this.listUkuranProduk();
    this.detailProduk();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
    
  }

  detailProduk()
  {
    let body = {
      FN:'detail_produk',id_produk:this.id_produk
    }
    this.prodServ.detailProduk(body)
    .map(res => res.json())
      .subscribe(res => {
        this.produk = res.data[0];
        console.log('data produk ',this.produk);
    });
  }

  listImage()
  {
    let body = {
      FN:'list_image_produk',id_produk:this.id_produk
    }
    this.prodServ.listImageProduk(body)
    .map(res => res.json())
      .subscribe(res => {
        this.images = res.data;
        console.log('data image ',this.images);
    });
  }

  listUkuranProduk()
  {
    let body = {
      FN:'list_ukuran',id_produk:this.id_produk
    }
    this.prodServ.listUkuran(body)
    .map(res => res.json())
      .subscribe(res => {
        this.ukuran = res.data;
        console.log('data ukuran ',this.ukuran);
    });
  }



  selectSize(e:any)
  {
    console.log("event ",e);
    //this.buttonColor = "#111111";
  }

  tambahKeranjang()
  {
    //this.presentConfirm();
    //console.log("modal");
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
