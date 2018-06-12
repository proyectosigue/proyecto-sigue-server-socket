import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController, PopoverController} from 'ionic-angular';
import {GodfathersDetailPopoverPage} from "./popover/godfathers-detail-popover";

@IonicPage()
@Component({
  selector: 'page-godfathers-detail',
  templateUrl: 'godfathers-detail.html',
})
export class GodfathersDetailPage {

  godfather: object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController,
              public popoverCtrl: PopoverController) {
    this.godfather = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GodfathersDetailPage');
  }

  presentActionSheet(){
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Acción',
      buttons: [
        {
          text: 'Apadrinar ahijado',
          handler: () => {
            console.log('Apadrinar');
          }
        },
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

  presentPopover(event) {
    let popover = this.popoverCtrl.create(GodfathersDetailPopoverPage);
    popover.present({
      ev: event
    });
  }

}
