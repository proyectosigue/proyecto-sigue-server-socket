import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";

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
  signUPUrl = "/users";

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
    this.httpClient.post(this.apiURL + this.signUPUrl, userData, _options)
      .subscribe( (data: any) => {
        self.presentResponse(data);
      });
  }

  presentResponse(response){
    let messages = "";
    for(let i = 0; i < response["messages"].length; i++){
      messages += response["messages"][i];
      if(response["status"] == "Error") messages += "<br>";
    }
    let alert = this.alertCtrl.create({
      title: response["status"],
      subTitle: messages,
      buttons: ['OK']
    });
    alert.present();
  }

}
