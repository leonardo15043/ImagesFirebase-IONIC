import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ImagePicker , ImagePickerOptions } from '@ionic-native/image-picker';
import { CargarArchivoProvider } from '../../providers/cargar-archivo/cargar-archivo';


@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  titulo: string = "";
  imagenPreview: string = "";
  imagen64:string;

  constructor( 
    private viewCtr:ViewController,
    private camera: Camera,
    private imagePicker: ImagePicker,
    public _cap:CargarArchivoProvider
     ) {
  }

  cerrar_modal(){
      this.viewCtr.dismiss();
  }

  mostrar_camara(){

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {

     this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
     this.imagen64 = imageData;

    }, (err) => {
      console.error("ERROR EN LA CAMARA ", JSON.stringify(err));
    });
    
  }

  seleccionar_foto(){

    console.log("seleccionar foto");

    let options:ImagePickerOptions = {
      quality: 70, //calidad de la imagen
      outputType: 1, // formato , en este case base64
      maximumImagesCount: 1 //cantidad de imagenes permitida para capturar
    }

    this.imagePicker.getPictures(options).then((results) => {
   
      for (var i = 0; i < results.length; i++) {
          this.imagenPreview = 'data:image/jpeg;base64,' + results[i];
          this.imagen64 = results[i];
      }
    }, (err) => { 
        console.error("Error al seleccionar imagen: " , JSON.stringify(err));
    });

  }

  crear_post(){

    let archivo = {
      img: this.imagen64,
      titulo: this.titulo
    }

    this._cap.cargar_imagen_firebase( archivo ).then(
      ()=> this.cerrar_modal(), // ya cuando cargue la imagen en le storage y guarde el registro en la base de datos cerrara el modal
      (err)=> console.log(err)
    );
  }

}
