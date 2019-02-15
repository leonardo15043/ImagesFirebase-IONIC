import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from 'ionic-angular';

import * as firebase from 'firebase';

@Injectable()
export class CargarArchivoProvider {

  imagenes: ArchivoSubir[] =  [];

  constructor(
    public toastCtrl: ToastController,
    public afDB:AngularFireDatabase
  ) {
    console.log('Hello CargarArchivoProvider Provider');
  }


  cargar_imagen_firebase( archivo: ArchivoSubir ){

    let promesa = new Promise( (resolve, reject)=>{
        this.mostrar_toast("Cargando...");
        //hacemos una referencia a la base de datos
        let storeRef = firebase.storage().ref(); 
        
        //le asignamos un nombre al archivo 
        let nombreArchivo:string = new Date().valueOf().toString(); 
        
        let uploadTask: firebase.storage.UploadTask =
            //agregamos la carpeta y el archivo que guardaremos en firebase 
            storeRef.child(`img/${ nombreArchivo }`) 
                    //asignamos el archivo que pasaremos de base64 a jpeg
                    .putString(  archivo.img, 'base64' , { contentType: 'image/jpeg' }) 


            uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED ,
              ()=>{ }, //Saber el % de Mbs se han subido
              ( error )=>{ 

                //SI HAY ALGUN ERROR

                  console.error("ERROR EN LA CARGA");
                  console.error(JSON.stringify( error ));
                  this.mostrar_toast(JSON.stringify( error ));

                  reject();
              },
              ()=>{ 

                // SI TODO SALIO BIEN

                console.log("Archivo subido");
                this.mostrar_toast("Imagen cargada correctamente");

                //cargamos la imagen que acabamos de guardar en el storage
                uploadTask.snapshot.ref.getDownloadURL().then(( downloadURL )=>{ 

                  //obtenemos la url de la imagen 
                    let url = downloadURL; 
  
                  //enviamos los datos para crear el registro en la base de datos 
                    this.crear_post( archivo.titulo, url, nombreArchivo ); 
                    resolve();

                });

              }
            )
    });

    return promesa;
  
  }

  private crear_post( titulo:string , url:string, nombreArchivo:string ){

      console.log("crear post");

      //Creamos la estructura del post que queremos guardar en la base de datos 
      let post: ArchivoSubir = {
        img: url,
        titulo: titulo,
        key:nombreArchivo
      };

      // this.afDB.list('/post').push(post); asi lo podemos agregar si queremos que firebase le asigne un id por defecto

        this.afDB.object(`/post/${ nombreArchivo }`).update(post);

        this.imagenes.push(post);
  }

  mostrar_toast( mensaje:string ){
    
    //Mostramos una alerta
    const toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();

  }

}

interface ArchivoSubir{
  titulo:string;
  img:string;
  key?:string;
}
