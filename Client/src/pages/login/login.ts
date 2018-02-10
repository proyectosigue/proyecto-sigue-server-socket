import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, Alert} from 'ionic-angular';

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

  @ViewChild('username') username;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signIn(){
    let alert = this.alertCtrl.create({
      title: 'No estás registrado',
      subTitle: 'Para poder entrar al sistema, pide a Proyecto Sigue tu registro',
      buttons: ['OK']
    });
    alert.present();
    console.log("username:" + this.username.value + " password: " + this.password.value);
  }

}
