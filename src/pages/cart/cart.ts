import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { PengirimanPage } from '../../pages/pengiriman/pengiriman';
import { LoginserviceProvider } from '../../providers/loginservice/loginservice';
import { LoginPage } from '../login/login';
import { GlobaldataProvider } from '../../providers/globaldata/globaldata';
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

  cart:any=[];
  subtotal:number=0;

  constructor(public navCtrl: NavController, public navParams: NavParams,public login:LoginserviceProvider,
    public alertCtrl:AlertController,private cartSrv:GlobaldataProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.showCart();
  }

  showCart()
  {
    this.cartSrv.showCart().then((res)=>{
      
      this.cart = res;
      console.log('show cart: ',this.cart);
      for(let i=0; i < this.cart.length; i++)
      {
        let total = this.cart[i].jumlah * this.cart[i].harga;
        
        this.subtotal += Number(total);
        //console.log('total',this.subtotal);
      }
    });


   

    
    
  }


  kurangiQty(item)
  {
    var qty:number = item.jumlah;
    qty--;

    if(qty <= 0)
    {
      this.cartSrv.deleteCart(item.id,item.rev);
    } else {
      this.cartSrv.updateCart(item.id,item.id_produk,item.nama_produk,item.ukuran,item.img_url,qty,item.harga,item.rev);
    }    
    this.showCart();
  }

  tambahQty(item)
  {
    var qty:number = item.jumlah;
    qty++;
    this.cartSrv.updateCart(item.id,item.id_produk,item.nama_produk,item.ukuran,item.img_url,qty,item.harga,item.rev);
    this.showCart();
  }

  deleteItem(item)
  {
    this.cartSrv.deleteCart(item.id,item.rev).then((res)=>{
      
      console.log('show cart: ',this.cart);
    });
    this.showCart();
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
