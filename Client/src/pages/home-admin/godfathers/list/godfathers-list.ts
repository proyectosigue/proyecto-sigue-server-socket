import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {GodfathersPopoverPage} from "./godfathers-popover/godfathers-popover";
import {GodfathersDetailPage} from "../detail/godfathers-detail";
import {GodfatherProvider} from "../../../../providers/godfather/godfather";

@IonicPage()
@Component({
  selector: 'page-godfathers',
  templateUrl: 'godfathers-list.html',
})
export class GodfathersPage {

  godfathers: any;
  godfathersDetailPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController,
              private godfatherProvider: GodfatherProvider) {
    this.godfathersDetailPage = GodfathersDetailPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GodfathersPage');
    this.godfatherProvider.getGodfathers().subscribe((data: any) => {
      this.godfathers = data;
    });
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(GodfathersPopoverPage);
    popover.present({
      ev: event
    });
  }

}
