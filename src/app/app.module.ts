import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SubirPage } from '../pages/subir/subir';

import { HttpClientModule  } from '@angular/common/http';

//Pipes
import { PipesModule } from '../pipes/pipes.module';


//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { CargarArchivoProvider } from '../providers/cargar-archivo/cargar-archivo';

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
    AngularFireAuthModule,
    PipesModule,
    HttpClientModule
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
    Camera,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CargarArchivoProvider
  ]
})
export class AppModule {}
