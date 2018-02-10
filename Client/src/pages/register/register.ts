import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, NavOptions} from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginPage} from "../login/login";

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

  apiURL = "http://localhost:8000";
  signUpUrl = "/users";

  username: string = "";
  password: string = "";
  email: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,
              public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  signUp(){
    let self = this;
    let _options = { headers: new HttpHeaders() };
    let userData = {"username": this.username, "password": this.password, "email": this.email};
    this.httpClient.post(this.apiURL + this.signUpUrl, userData, _options)
      .subscribe( (data: any) => {
        self.presentResponse(data);
      });
  }

  presentResponse(response){
    let self = this;
    let messages = "";
    for(let i = 0; i < response["messages"].length; i++){
      messages += response["messages"][i];
      if(response["messages"].length > 1 && response["status"] == "Error") messages += "<br>";
    }
    let alert = this.alertCtrl.create({
      title: response["status"],
      subTitle: messages,
      buttons: [
        {
        text: 'OK',
          handler: () => {
            if(response["status"] == "Éxito") self.navCtrl.popToRoot();
          }
      }
    ]});
    alert.present();
  }

}
