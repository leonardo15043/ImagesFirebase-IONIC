import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SubirPage } from '../pages/subir/subir';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyBgyfnR0NQHygulZk-SMiSOy28sh73BLdo",
  authDomain: "imagesfirebaseionic.firebaseapp.com",
  databaseURL: "https://imagesfirebaseionic.firebaseio.com",
  projectId: "imagesfirebaseionic",
  storageBucket: "imagesfirebaseionic.appspot.com",
  messagingSenderId: "1091909961356"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SubirPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SubirPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
