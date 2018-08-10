import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {GodfathersPopoverPage} from "./godfathers-popover/godfathers-popover";
import {GodfathersDetailPage} from "../detail/godfathers-detail";
import {GodfatherProvider} from "../../../../providers/godfather/godfather";
import {GodfatherTopicsListPage} from "../topics/list/godfather-topics-list";
import {Godfather, IGodfather} from "../../../../models/godfather";

@IonicPage()
@Component({
  selector: 'page-godfathers',
  templateUrl: 'godfathers-list.html',
})
export class GodfathersPage {

  godfathersDetailPage: any;
  godfatherTopicsListPage: any;

  godfathers: Godfather[] = [];

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
    this.godfatherProvider.getGodfathers().subscribe((data: IGodfather[]) => {
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
