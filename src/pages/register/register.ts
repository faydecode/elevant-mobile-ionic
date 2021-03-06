import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Loading,ToastController } from 'ionic-angular';
import { LoginserviceProvider }  from '../../providers/loginservice/loginservice';
import { Register2Page }  from '../../pages/register2/register2';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  account: { email: string } = 
  { email:'' };

  loader:Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loginSrv:LoginserviceProvider,
    public loadingCtrl:LoadingController,public toastCtrl:ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
        content: "Mohon tunggu..."
      });
      this.loader.present();
  }

  cekEmailExist()
  {

    this.presentLoading();
    this.loginSrv.cekEmail(this.account.email)
    .map(res => res.json())
     .subscribe(resp => {
      this.loader.dismiss();
      if(resp.kode == 1)  //email sudah terdaftar
      {
        let toast3 = this.toastCtrl.create({
          message: 'Email sudah terdaftar. Silakan lakukan login',
          duration: 3000,
          position: 'top'
        });
        toast3.present();
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
