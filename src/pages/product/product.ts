import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductServiceProvider } from '../../providers/product-service/product-service';
import { ProductDetailPage } from '../../pages/product-detail/product-detail';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  kategori:any;
  nama:string='';
  produk:any[] = [
    { id_produk:'KS20180400001', nama_produk:'Kemeja Anak',harga:18500 },
    { id_produk:'KS20180400002', nama_produk:'Kemeja Dewasa',harga:15000 }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,public prodServ:ProductServiceProvider) {
    this.kategori = navParams.get('kategori');
    this.nama = this.kategori.nama_kat_produk;
    console.log('ionVi',this.kategori);
  }

  ionViewDidLoad() {
    console.log('ionVi',this.kategori);
    //this.listProduk();
  }

  listProduk()
  {
    let body = { FN:'list_produk',id_kat_produk:this.kategori.id_kat_produk }

    this.prodServ.listProduk(body)
      .map(res => res.json())
      .subscribe(res => {
        this.produk = res.data;
        console.log('data produk ',this.produk);
    });
  }

  openDetail(p)
  {
    console.log('click');
    this.navCtrl.push(ProductDetailPage, { id_produk:p.id_produk });
  }

}
