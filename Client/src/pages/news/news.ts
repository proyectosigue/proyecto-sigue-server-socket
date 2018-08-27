import { Component } from '@angular/core';
import {
  IonicPage,
  NavParams,
  AlertController,
  IonicPage,
  NavController,
  ToastController
} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NewProvider} from "../../providers/new/new";
import {NativeStorage} from "@ionic-native/native-storage";

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  title: string = "";
  description: string = "";
  new_image: string = "";
  imageURI: any;
  imageData: any;
  form: FormGroup;

  constructor(public navParams: NavParams, private camera: Camera, public toastCtrl: ToastController,
              private formBuilderCtrl: FormBuilder, private newProvider: NewProvider, public alertCtrl: AlertController,
              public navCtrl: NavController, private nativeStorage: NativeStorage) {
    this.createForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

  createForm() {
    this.form = this.formBuilderCtrl.group({
      new_image: null
    });
  }

  registerNew() {
    let self = this;
    let newData = {
      "title": this.title,
      "description": this.description,
      "created_by": this.nativeStorage.getItem("session")["__zone_symbol__value"].user.id,
      "image": (this.imageURI !== "") ?  self.form.value : null,
    };
    this.newProvider.registerNew(newData).subscribe((newResp: any) => {
      this.presentResponse(newResp);
    });
  }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: 0,
    };

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = "data:image/jpeg;base64," + imageData;
      this.imageData = imageData;

      this.form.get('new_image').setValue({
        filename: "new_image",
        filetype: "jpeg",
        value: imageData
      });

    }, (err) => {
      this.presentToast(err);
    });
  }

  presentResponse(response) {
    let self = this;
    let messages = "";
    for (let i = 0; i < response["messages"].length; i++) {
      messages += response["messages"][i];
      if (response["messages"].length > 1 && response["status"] == "error") messages += "<br>";
    }
    let alert = this.alertCtrl.create({
      title: response["header"],
      subTitle: messages,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            if (response["status"] == "success") self.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
