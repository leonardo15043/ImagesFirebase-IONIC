import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from 'ionic-angular';

import * as firebase from 'firebase';

@Injectable()
export class CargarArchivoProvider {

  constructor(
    public toastCtrl: ToastController
  ) {
    console.log('Hello CargarArchivoProvider Provider');
  }


  cargar_imagen_firebase( archivo: ArcivoSubir ){

    let promesa = new Promise( (resolve, reject)=>{
        this.mostrar_toast("Cargando...");
        
        let storeRef = firebase.storage().ref(); //hacemos una referencia a la base de datos
    
        let nombreArchivo:string = new Date().valueOf().toString(); //le asignamos un nombre al archivo 
        
        let uploadTask: firebase.storage.UploadTask =
            storeRef.child(`img/${ nombreArchivo }`) //agregamos la carpeta y el archivo que guardaremos en firebase 
                    .putString(  archivo.img, 'base64' , { contentType: 'image/jpeg' }) //asignamos el archivo que pasaremos de base64 a jpeg


            uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED ,
              ()=>{ }, //saber el % de Mbs se han subido
              ( error )=>{ 
                //si hay algun error
                  console.error("ERROR EN LA CARGA");
                  console.error(JSON.stringify( error ));
                  this.mostrar_toast(JSON.stringify( error ));

                  reject();
              },
              ()=>{ 
                // si todo sale bien 
                console.log("Archivo subido");
                this.mostrar_toast("Imagen cargada correctamente");
                resolve();
              }
            )
    });

    return promesa;
  
  }

  mostrar_toast( mensaje:string ){

    const toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();

  }

}

interface ArcivoSubir{
  titulo:string;
  img:string;
  key?:string;
}
