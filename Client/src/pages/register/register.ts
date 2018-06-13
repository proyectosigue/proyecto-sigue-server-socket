import {Component, ElementRef, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, NavOptions, LoadingController, ToastController} from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { FileTransfer, FileUploadOptions, FileTransferObject } from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import { Camera, CameraOptions } from "@ionic-native/camera";
import {NativeStorage} from "@ionic-native/native-storage";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TabsPage} from "../tabs/tabs";
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  apiURL = "http://localhost:8010";
  signUpUrl = "/godfathers/sign-up";

  first_name: string = "";
  last_name: string = "";
  interests: string = "";
  password: string = "";
  email: string = "";
  profile_image: string = "";
  imageURI: any;
  imageData: any;
  imageFileName: any;
  form: FormGroup;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,
              public alertCtrl: AlertController, private transfer: FileTransfer, private file: File,
              private camera: Camera, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
              private nativeStorage: NativeStorage, private formBuilderCtrl: FormBuilder, private userProvider: UserProvider) {
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

  signUp(){
    let self = this;

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type','application/json');
    headers = headers.append('Accept','application/json');
    let _options = { headers: headers };

    let userData = {"first_name": this.first_name, "password": this.password, "email": this.email,
    "last_name": this.last_name, "interests": this.interests, "profile_image": this.profile_image};

    this.httpClient.post(this.apiURL + this.signUpUrl, userData, _options)
      .subscribe( (signUpRes: any) => {
        console.log("uri: " + this.imageURI);
        switch(signUpRes.status) {
          case "success":
            if (this.imageURI !== "") {
              console.log(this.form);
              const formModel = this.form.value;
              self.userProvider.uploadProfileImage(formModel, signUpRes.data.id).then((res:any) => {
                res.subscribe((data: any) => {
                  console.log(data);
                  this.presentResponse(signUpRes);
                });
              });
            }
            else {
              this.presentResponse(signUpRes);
            }
            break;
          case "error":
          default:
            this.presentResponse(signUpRes);
            break;
        }
      });
  }

  presentResponse(response){
    let self = this;
    let messages = "";
    for(let i = 0; i < response["messages"].length; i++){
      messages += response["messages"][i];
      if(response["messages"].length > 1 && response["status"] == "error") messages += "<br>";
    }
    let alert = this.alertCtrl.create({
      title: response["header"],
      subTitle: messages,
      buttons: [
        {
        text: 'OK',
          handler: () => {
            if(response["status"] == "success") self.navCtrl.pop();
          }
      }
    ]});
    alert.present();
  }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = "data:image/jpeg;base64," + imageData;
      this.imageData = imageData;

      this.form.get('profile_image').setValue({
        filename: "name.jpg",
        filetype: "jpg",
        value: imageData
      });

    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }

  uploadFile(userId) {

    /*let self = this;

    return new Promise((resolve) => {

      let loader = this.loadingCtrl.create({
        content: "Uploading..."
      });
      loader.present();
      const fileTransfer: FileTransferObject = this.transfer.create();

      this.nativeStorage.getItem("session").then(res => {

        let headers = new HttpHeaders();
        headers = headers.append('Content-Type','application/json');
        headers = headers.append('Accept','application/json');
        headers = headers.append('Authorization', 'Bearer ' + res.token);

        let options: FileUploadOptions = {
          fileKey: 'file',
          fileName: 'filename.jpg',
          chunkedMode: false,
          mimeType: "multipart/form-data",
          headers: { headers }
        };

        const formModel = this.form.value;*/

/*        resolve(fileTransfer.upload(encodeURI(self.imageURI), "http://localhost:8010/godfathers/" + userId + "/upload-profile-image", options)
          .then((data) => {
            resolve('Uploaded');
            console.log(data + " Uploaded Successfully");
            this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
            loader.dismiss();
            this.presentToast("Image uploaded successfully");
          }, (err) => {
            resolve('Failed');
            console.log("errorsote");
            console.log(err);
            loader.dismiss();
            this.presentToast(err);
          }));*/

      //});

    //});
  }

  pathForImage(image) {
    if (image === null) {
      return '';
    } else {
      return this.file.dataDirectory + image;
    }
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
