import {Component} from '@angular/core';
import {IonicPage, NavController, ViewController, App} from 'ionic-angular';
import {LoginPage} from '../../../login/login';

@IonicPage()
@Component({
  template: `
    <ion-list>
      <ion-list-header>Acciones</ion-list-header>
      <button ion-item (click)="createTopic()">Iniciar sesion</button>
    </ion-list>
  `
})
export class NewsListPopoverPage {

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public appCtrl: App) {}

  createTopic() {
    this.viewCtrl.dismiss().then(() => {
    this.appCtrl.getRootNav().push(LoginPage);
  });
  }

}
