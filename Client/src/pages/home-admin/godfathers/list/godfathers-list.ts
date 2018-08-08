import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {GodfathersPopoverPage} from "./godfathers-popover/godfathers-popover";
import {GodfathersDetailPage} from "../detail/godfathers-detail";
import {GodfatherProvider} from "../../../../providers/godfather/godfather";
import {GodfatherTopicsListPage} from "../topics/list/godfather-topics-list";

@IonicPage()
@Component({
  selector: 'page-godfathers',
  templateUrl: 'godfathers-list.html',
})
export class GodfathersPage {

  godfathers: any;
  godfathersDetailPage: any;
  godfatherTopicsListPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController,
              private godfatherProvider: GodfatherProvider) {
    this.godfathersDetailPage = GodfathersDetailPage;
    this.godfatherTopicsListPage = GodfatherTopicsListPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GodfathersPage');
    this.fillGodfathers();
  }

  fillGodfathers(){
    this.godfatherProvider.getGodfathers().subscribe((data: any) => {
      this.godfathers = data;
      console.log(this.godfathers);
    });
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(GodfathersPopoverPage);
    popover.present({
      ev: event
    });
  }

}
