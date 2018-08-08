import { Component } from '@angular/core';
import {AlertController, App, Events, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {ThreadProvider} from "../../../../../../providers/thread/thread";
import { GodfatherTopicDetailPage } from "../../detail/godfather-topic-detail";

@IonicPage()
@Component({
  template: `
    <ion-list>
      <ion-list-header>Acciones</ion-list-header>
      <button ion-item (click)="promptCreateUserThread()">Crear tema</button>
      <button ion-item (click)="confirmDeleteAllUserThreads()">Borrar todos</button>
    </ion-list>
  `
})
export class GodfatherTopicsListPopoverPage {

  godfather: any;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public appCtrl: App,
              public navParams: NavParams, private threadProvider: ThreadProvider, public events: Events,
              public alertCtrl: AlertController) {
    this.godfather = this.navParams.data;
  }

  confirmDeleteAllUserThreads(){
    let alert = this.alertCtrl.create({
      title: 'Confirmar',
      message: 'Está seguro de eliminar todos los temas?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Continuar',
          handler: () => {
            this.viewCtrl.dismiss().then(() => {
              this.events.publish('threads:delete-all', this.godfather)
            });
          }
        }
      ]
    });
    alert.present();
  }

  promptCreateUserThread(){
    let alert = this.alertCtrl.create({
      title: 'Crear tema',
      inputs: [
        {
          name: 'subject',
          placeholder: 'Asunto'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Crear',
          handler: data => {
            this.viewCtrl.dismiss().then(() => {
              this.events.publish('threads:create', this.godfather, data.subject)
            });
          }
        }
      ]
    });
    alert.present();
  }

}
