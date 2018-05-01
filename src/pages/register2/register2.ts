import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Loading,ToastController,AlertController } from 'ionic-angular';
import { LoginserviceProvider }  from '../../providers/loginservice/loginservice';
import { LoginPage } from '../../pages/login/login';

/**
 * Generated class for the Register2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register2',
  templateUrl: 'register2.html',
})
export class Register2Page {
  account: { username: string, password:string,email:string,FN:string } = 
  { username:'',password:'',email:'',FN:'register' };

  loader:Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loginSrv:LoginserviceProvider,
    public loadingCtrl:LoadingController,public toastCtrl:ToastController,public alertCtrl:AlertController
  ) {
    this.account.email = navParams.get('email');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register2Page');
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
        content: "Mohon tunggu..."
      });
      this.loader.present();
  }

  doRegister()
  {
    this.presentLoading();
    this.loginSrv.register(this.account)
    .map(res => res.json())
     .subscribe(resp => {
      this.loader.dismiss();
      if(resp.kode == 1)  //email sudah terdaftar
      {
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: 'Selamat! anda telah terdaftar sebagai member elevant. Silakan login!',
          buttons: [{
            text: 'LOGIN',
            handler: data => {
              this.navCtrl.setRoot(LoginPage);
            }
          }]
        });
        alert.present();
      } else {
        this.navCtrl.setRoot(Register2Page, { email:this.account.email });
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
