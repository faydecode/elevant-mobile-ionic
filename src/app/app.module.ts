import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule, Http } from '@angular/http';
import { Storage, IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProductPage } from '../pages/product/product';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { CartPage } from '../pages/cart/cart';
import { PengirimanPage } from '../pages/pengiriman/pengiriman';
import { KonfirmasiPage }  from '../pages/konfirmasi/konfirmasi';
import { ModalCartedPage } from '../pages/modal-carted/modal-carted';
import { BuktiBayarPage } from '../pages/bukti-bayar/bukti-bayar';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpserviceProvider } from '../providers/httpservice/httpservice';
import { LoginserviceProvider } from '../providers/loginservice/loginservice';
import { GlobaldataProvider } from '../providers/globaldata/globaldata';
import { HomeserviceProvider } from '../providers/homeservice/homeservice';
import { ProductServiceProvider } from '../providers/product-service/product-service';
import { Register2Page } from '../pages/register2/register2';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ProductPage,
    ProductDetailPage,
    ModalCartedPage,
    CartPage,
    PengirimanPage,
    KonfirmasiPage,
    BuktiBayarPage,
    Register2Page
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ProductPage,
    ProductDetailPage,
    ModalCartedPage,
    CartPage,
    PengirimanPage,
    KonfirmasiPage,
    BuktiBayarPage,
    Register2Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpserviceProvider,
    LoginserviceProvider,
    GlobaldataProvider,
    HomeserviceProvider,
    ProductServiceProvider
  ]
})
export class AppModule {}
