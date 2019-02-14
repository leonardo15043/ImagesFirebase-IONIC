import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { SubirPage  } from '../subir/subir';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor( private modalCtr:ModalController ) {

  }

  mostrar_model(){

    let modal = this.modalCtr.create( SubirPage );
    modal.present();
    
  }

}
