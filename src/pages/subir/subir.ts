import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ImagePicker , ImagePickerOptions } from '@ionic-native/image-picker';

@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  titulo: string;
  imagenPreview: string;

  constructor( 
    private viewCtr:ViewController,
    private camera: Camera,
    private imagePicker: ImagePicker
     ) {
  }

  cerrar_modal(){
      this.viewCtr.dismiss();
  }

  mostrar_camara(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {

     this.imagenPreview = 'data:image/jpeg;base64,' + imageData;

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
      }
    }, (err) => { 
        console.error("Error al seleccionar imagen: " , JSON.stringify(err));
    });

  }

}
