import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the GodsonsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-godsons-detail',
  templateUrl: 'godsons-detail.html',
})
export class GodsonsDetailPage {

  godson: object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {
    this.godson = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GodsonsDetailPage');
  }

  presentActionSheet(){
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Acción',
      buttons: [
        {
          text: 'Editar',
          handler: () => {
            console.log('Editar');
          }
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            console.log('Eliminar');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
