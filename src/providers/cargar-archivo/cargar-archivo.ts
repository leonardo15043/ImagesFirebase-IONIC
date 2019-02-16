import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from 'ionic-angular';

import * as firebase from 'firebase';
import 'rxjs/add/operator/map';


@Injectable()
export class CargarArchivoProvider {

  imagenes: ArchivoSubir[] = [];
  lastKey: string = null;

  constructor(
    public toastCtrl: ToastController,
    public afDB:AngularFireDatabase
  ) {
    this.cargar_ultimo_key();
  }

  private cargar_ultimo_key(){

   return  this.afDB.list('/post', ref=> ref.orderByKey().limitToLast(1)) //traemos el ultimo elemento insertado
             .valueChanges()
             .subscribe( (post:any) =>{ //nos subscribimos a la promesa 

               this.lastKey = post[0].key; //asignamos el key a la variable lastKey
               this.imagenes.push( post[0] ); //agregamos todo los datos de post al objeto imagenes

               this.cargar_imagenes();

             });
             
  }

  cargar_imagenes(){

    let promesa = new Promise((resolve , reject)=>{
        
        this.afDB.list('/post' , 
          ref=> ref.limitToLast(3)  //traemos los ultimos 3 registros
                  .orderByKey()  //ordenamos por la llave 
                  .endAt( this.lastKey ) //la consulta terminara hasta el id que este en lastKey
        ).valueChanges()
          .subscribe( ( posts:any )=>{

            posts.pop(); //eliminamos el ultimo regustro por que estaria duplicado

            if( posts.length == 0 ){ //validamos si no hay registros 
                console.log("Ya no hay mas registros");
                resolve(false); //terminamos la promesa sabiendo que ya no hay mas imagenes 
                return;
            }

            //si hay registros

            this.lastKey = posts[0].key; //asignamos el ultimo registro

            //hacemos el ciclo de los registro pero de manera inversa para que me 
              //muestre el ultimo registro ingresado de primeras 
              
            for( let i = posts.length-1; i>= 0; i--){ 
              let post = posts[i];
              this.imagenes.push(post); //agregamos los post al objeto imagenes
            }

            resolve(true);

          })

    });

    return promesa;

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
