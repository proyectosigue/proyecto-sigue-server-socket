import {Component} from '@angular/core';
import {IonicPage, NavController, ViewController, App} from 'ionic-angular';
import {NewsPage} from "../../../../news/news";

@IonicPage()
@Component({
  template: `
    <ion-list>
      <ion-list-header>Acciones</ion-list-header>
      <button ion-item (click)="createTopic()">Crear Noticia</button>
    </ion-list>
  `
})
export class AboutPopoverPage {

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public appCtrl: App) {}

  createTopic() {
    this.viewCtrl.dismiss().then(() => {
    this.appCtrl.getRootNav().push(NewsPage);
  });
  }

}
