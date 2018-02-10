import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, Alert} from 'ionic-angular';
import { RegisterPage } from "../register/register";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TabsPage} from "../tabs/tabs";
import {UserProvider} from "../../providers/user/user";
import { NativeStorage } from '@ionic-native/native-storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  apiURL = "http://localhost:8000";
  signInURL = "/login";

  password: string = "";
  email: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private httpClient: HttpClient, private userProvider: UserProvider, private nativeStorage: NativeStorage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signIn(){
    let self = this;
    this.userProvider.validateUser(this.email, this.password).subscribe( (data: any) => {
        if(data["status"] == "Error") {
          self.presentResponse(data);
        }
        else {
          self.nativeStorage.setItem("session", data["data"]);
          self.navCtrl.setRoot(TabsPage, data);
        }
      });
  }

  presentResponse(response){
    let self = this;
    let alert = this.alertCtrl.create({
      title: response["status"],
      subTitle: response["message"],
      buttons: [
        {
          text: 'OK',
        }
      ]});
    alert.present();
  }

  pushSignUp(){
    this.navCtrl.push(RegisterPage);
  }

}
