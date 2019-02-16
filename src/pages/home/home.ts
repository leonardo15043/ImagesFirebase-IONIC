import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { SubirPage  } from '../subir/subir';
import { SocialSharing } from '@ionic-native/social-sharing';

// import { AngularFireDatabase } from '@angular/fire/database';
// import { Observable } from 'rxjs/Observable';

import { CargarArchivoProvider } from '../../providers/cargar-archivo/cargar-archivo';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    
  // items: Observable<any[]>;
  hayMas: boolean = true;

  constructor(  
    private modalCtr:ModalController,  
    public _cap:CargarArchivoProvider,
    private socialSharing: SocialSharing,
 
    // afDB: AngularFireDatabase
     ) {
      // this.items = afDB.list('post').valueChanges();
     }

  mostrar_model(){

    let modal = this.modalCtr.create( SubirPage );
    modal.present();
    
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    //llamamos el metodo cargar_imagenes para 
    //cargar las demas imagenes cuando hagamos scroll
    this._cap.cargar_imagenes().then(
      ( hayMas:boolean )=>{
        this.hayMas = hayMas;
        infiniteScroll.complete();
      }
    );

  }
  
  compartir( post ){
  
    this.socialSharing.shareViaWhatsApp( post.titulo, post.img ).then(() => {
      this._cap.mostrar_toast("La publicacion "+post.titulo+" fue compartida correctamente");
    }).catch(() => {
      this._cap.mostrar_toast("Ocurrio un error al compartir la publicación");
    });
    
  } 

}