import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { SubirPage  } from '../subir/subir';

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
    public _cap:CargarArchivoProvider
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

}
