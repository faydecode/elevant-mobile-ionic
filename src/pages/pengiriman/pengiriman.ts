import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController  } from 'ionic-angular';
import { KonfirmasiPage } from '../../pages/konfirmasi/konfirmasi';

/**
 * Generated class for the PengirimanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pengiriman',
  templateUrl: 'pengiriman.html',
})



export class PengirimanPage {

  bank:string='bca';

  jneTipe:any = [
    { type: 'radio',label:'REG',value:'REG',checked:true },
    { type: 'radio',label:'OK',value:'OK',checked:false },
    { type: 'radio',label:'YES',value:'YES',checked:false }
    
  ];

  tikiTipe:any = [
    { type: 'radio',label:'REG',value:'REG',checked:true },
    { type: 'radio',label:'ECO',value:'ECO',checked:false },
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PengirimanPage');
    
  }

  gotoKonfirmasi()
  {
    this.navCtrl.push(KonfirmasiPage);
  }

  showRadio(tipe) {
      let alert = this.alertCtrl.create();
      alert.setTitle('Pilih Paket');

      if(tipe === 'jne')
      {
        for(let t in this.jneTipe)
        {
          alert.addInput( this.jneTipe[t] );
        }
      } else {
        for(let p in this.tikiTipe)
        {
          alert.addInput( this.tikiTipe[p]);
        }
      }
      

      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: data => {
          //this.testRadioOpen = false;
          //this.testRadioResult = data;
        }
      });
      alert.present();
  }

}
