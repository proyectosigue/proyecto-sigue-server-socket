import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {AdminTabsPage} from "../home-admin/tabs/admin-tabs";
import {UserProvider} from "../../providers/user/user";
import {NativeStorage} from '@ionic-native/native-storage';
import {GodfatherTabsPage} from "../home-godfather/tabs/godfather-tabs";

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
    this.adminDebugSignIn();
  }

  signIn() {
    let self = this;
    this.userProvider.validateUser(this.email, this.password).subscribe((res: any) => {
      if (res["status"] == "Error") {
        self.presentResponse(res);
      }
      else {
        self.nativeStorage.setItem("session", res);
        if(res.user.role_description === 'Administrador')
            self.navCtrl.setRoot(AdminTabsPage, res);
          else
            self.navCtrl.setRoot(GodfatherTabsPage, res);
      }
    });
  }

  adminDebugSignIn(){
    let self = this;
    this.userProvider.validateUser("coordinacion@proyectosigue.com.mx", "123456").subscribe((res: any) => {
      if (res["status"] == "Error") {
        self.presentResponse(res);
      }
      else {
        self.nativeStorage.setItem("session", res);
        if(res.user.role_description === 'Administrador')
          self.navCtrl.setRoot(AdminTabsPage, res);
        else
          self.navCtrl.setRoot(GodfatherTabsPage, res);
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
