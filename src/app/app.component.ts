import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LoginserviceProvider } from '../providers/loginservice/loginservice';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any, icon:string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public login:LoginserviceProvider
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'BERANDA', component: HomePage, icon:'ios-home-outline'},
      { title: 'KEMEJA', component: HomePage, icon:'ios-shirt-outline' },
      { title: 'TAS', component: HomePage, icon:'ios-basket-outline' },
      { title: 'KAOS', component: HomePage, icon:'ios-bowtie-outline' },
      { title: 'CELANA', component: HomePage, icon:'ios-medal-outline' },
      { title: 'JAKET', component: HomePage, icon:'ios-home-outline' },
      { title: 'AKSESORIS', component: HomePage, icon:'ios-home-outline' },
      { title: 'KONFIRMASI PEMBAYARAN', component: HomePage, icon:'ios-calculator-outline' },
      { title: 'KERANJANG BELANJA', component: HomePage, icon:'ios-basket-outline' },
      { title: 'PROSES PESANAN', component: HomePage, icon:'ios-redo-outline' },
      { title: 'KIRIM PESAN', component: HomePage, icon:'ios-mail-outline' },
      { title: 'AKUN', component: HomePage, icon:'ios-person-outline' },
      { title: 'SIGN OUT', component: HomePage, icon:'ios-exit-outline' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.login.cekLogin().then((isLoggedIn)=> {
        if(isLoggedIn) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = LoginPage;
        }
      });
      

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
