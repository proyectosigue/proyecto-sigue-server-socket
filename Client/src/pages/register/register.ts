import {Component, ElementRef, ViewChild} from '@angular/core';
import {
  AlertController,
  IonicPage, NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserProvider} from "../../providers/user/user";
import {Singleton} from "../../providers/singleton/singleton";
import {GodfatherProvider} from "../../providers/godfather/godfather";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  first_name: string = "";
  last_name: string = "";
  interests: string = "";
  password: string = "";
  email: string = "";
  profile_image: string = "";
  imageURI: any;
  imageData: any;
  form: FormGroup;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(public navParams: NavParams, private singletonService: Singleton, private camera: Camera,
              public toastCtrl: ToastController, private godfatherProvider: GodfatherProvider,
              private formBuilderCtrl: FormBuilder, private userProvider: UserProvider, public alertCtrl: AlertController,
              public navCtrl:NavController) {
    this.createForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  createForm() {
    this.form = this.formBuilderCtrl.group({
      profile_image: null
    });
  }

  signUp() {
    let self = this;
    let userData = {
      "first_name": this.first_name, "password": this.password, "email": this.email,
      "last_name": this.last_name, "interests": this.interests, "profile_image": this.profile_image
    };
    this.userProvider.signUp(userData).subscribe((signUpRes: any) => {
      switch (signUpRes.status) {
        case "success":
          if (this.imageURI !== "") {
            self.godfatherProvider.uploadProfileImage(self.form.value, signUpRes.data.id).subscribe((profileImgRes: any) => {
              this.presentResponse(signUpRes);
            });
          }
          else {
            this.presentResponse(signUpRes);
          }
          break;
        case "error":
        default:
          this.presentResponse(signUpRes);
      }
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

      this.form.get('profile_image').setValue({
        filename: "profile_image",
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
