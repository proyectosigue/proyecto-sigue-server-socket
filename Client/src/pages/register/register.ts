import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, NavOptions} from 'ionic-angular';
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

  apiURL = "http://localhost:8010";
  signUpUrl = "/users/godfathers/sign-up";

  first_name: string = "";
  last_name: string = "";
  interests: string = "";
  password: string = "";
  email: string = "";
  profile_image: string = "TEMPORAL";

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,
              public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
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
            if(response["status"] == "Éxito") self.navCtrl.pop();
          }
      }
    ]});
    alert.present();
  }

}
