import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  template: `
    <ion-list>
      <ion-list-header>Navegar</ion-list-header>
      <button ion-item (click)="pushGodfatherGodsonsListPage()">Ver ahijados</button>
    </ion-list>
  `
})
export class GodfathersDetailPopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GodfathersDetailPopoverPage');
  }

  pushGodfatherGodsonsListPage(){
    console.log('pushGodfatherGodsonsListPage');
  }

}
