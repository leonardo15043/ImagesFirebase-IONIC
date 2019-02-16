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

}
