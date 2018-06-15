import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {TabsPage} from "../home-admin/tabs/tabs";
import {UserProvider} from "../../providers/user/user";
import {NativeStorage} from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  password: string = "";
  email: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private userProvider: UserProvider, private nativeStorage: NativeStorage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signIn() {
    let self = this;
    this.userProvider.validateUser(this.email, this.password).subscribe((res: any) => {
      if (res["status"] == "Error") {
        self.presentResponse(res);
      }
      else {
        self.nativeStorage.setItem("session", res);
        self.navCtrl.setRoot(TabsPage, res);
      }
    });
  }

  presentResponse(response) {
    let alert = this.alertCtrl.create({
      title: response["status"],
      subTitle: response["message"],
      buttons: [
        {
          text: 'OK',
        }
      ]
    });
    alert.present();
  }

  pushSignUp() {
    this.navCtrl.push(RegisterPage);
  }


}
