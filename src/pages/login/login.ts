import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, LoadingController, Loading } from 'ionic-angular';

import { LoginserviceProvider } from '../../providers/loginservice/loginservice';
import { GlobaldataProvider } from '../../providers/globaldata/globaldata';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public account: {username: string, password: string,FN:String } = 
  { username:'',password:'',FN:'login' };
  private loginErrorString: string = 'Gagal Login';
  loader:Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController,
    public loadingCtrl:LoadingController,public loginService:LoginserviceProvider,public global:GlobaldataProvider
  ) {
    this.account.username = '';
    this.account.password = '';
    this.account.FN = 'login';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
        content: "Mohon tunggu..."
      });
      this.loader.present();
  }

  doLogin() {
    //this.navCtrl.setRoot(HomePage);
    console.log('akun',this.account);
    this.presentLoading();
    this.loginService.doLogin(this.account)
     .map(res => res.json())
     .subscribe(resp => {
        console.log('resep',resp);
        if(resp.kode == 1) {
          this.navCtrl.setRoot(HomePage);
          this.loginService.saveLogin(resp);
          this.loader.dismiss();
        } else {
          this.loader.dismiss();
          let toast = this.toastCtrl.create({
            message: this.loginErrorString,
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
    }, (err) => {
      //this.navCtrl.push(MainPage);
      // Unable to log in
      this.loader.dismiss();
      let toast = this.toastCtrl.create({
        message: err,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
    
  }


}
