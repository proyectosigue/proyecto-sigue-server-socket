import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  signUp(){
    /*let headers = new HttpHeaders();
    headers.append("Access-Control-Allow-Methods",  "*");*/

    let _options = { headers: new HttpHeaders() };

    let userData = {"username": this.username, "password": this.password, "email": this.email};
    this.httpClient.post(this.apiURL + this.signUPUrl, userData, _options)
      .subscribe( (data: any) => {
        console.log(data)
      });
    console.log("username:" + this.username + " password: " + this.password);
  }

}
