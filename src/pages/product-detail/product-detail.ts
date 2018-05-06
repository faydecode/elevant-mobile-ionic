import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ModalController } from 'ionic-angular';
import { ModalCartedPage } from '../../pages/modal-carted/modal-carted';
import { ProductServiceProvider } from '../../providers/product-service/product-service';
import { GlobaldataProvider } from '../../providers/globaldata/globaldata';

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
  id_produk:string='';
  produk:any = {};
  selectedSize:string='';
  buttonColor: string = '#FFF'; //Default Color
  jumlah:number=1;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController,
    public modalCtrl:ModalController, public prodServ:ProductServiceProvider,public cartSrv:GlobaldataProvider
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
        console.log('data images',res);
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



  selectSize(u)
  {
    //console.log("event ",e);
    //this.buttonColor = "#111111";
    this.selectedSize = u.kode_ukuran;
  }

  tambahKeranjang()
  {
    //this.presentConfirm();
    //console.log("modal");
    /*console.log('id_produk',this.id_produk);
    console.log('nama_produk',this.produk.nama_produk);
    console.log('ukuran',this.selectedSize);
    console.log('images',this.images[0].img_url);
    */
   
   this.cartSrv.getProduk(this.id_produk,this.selectedSize).then((res)=>{
    console.log('ada produk?',res);
    if(res)
    {
      this.jumlah += res[0].jumlah;
      var harga = this.produk.harga * this.jumlah;
      
      this.cartSrv.updateCart(res[0].id,res[0].id_produk,res[0].nama_produk,res[0].ukuran,
        res[0].img_url,this.jumlah,harga,res[0].rev).then((res3)=>{
          if(res3)
          {
            this.showConfirm();
          }    
        });

    } else {
      this.cartSrv.addCart(this.id_produk,this.produk.nama_produk,this.selectedSize,
        this.images[0].img_url,1,this.produk.harga).then((res2)=>{
          if(res2)
          {
            this.showConfirm();
          }    
        });
    }
    
   });
   
   //console.log('jumlah sudah',this.jumlah);
   
  }

  showConfirm()
  {
    console.log("modal");
    let confirmModal = this.modalCtrl.create(ModalCartedPage);
    confirmModal.onDidDismiss(data => {

    });
    confirmModal.present();
  }

  
}
