import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  template: `
    <ion-list>
      <ion-list-header>Navegar</ion-list-header>
      <button ion-item (click)="pushCreateGodson()">Agregar ahijado</button>
    </ion-list>
  `
})
export class GodsonsPopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GodsonsPopoverPage');
  }

  pushCreateGodson(){
    console.log('pushCreateGodson');
  }

}
