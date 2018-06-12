import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {GodfathersPopoverPage} from "../../godfathers-popover/godfathers-popover";
import {RegisterPage} from "../../register/register";
import {UserProvider} from "../../../providers/user/user";
import {GodfathersDetailPage} from "../detail/godfathers-detail";
import {TabsPage} from "../../tabs/tabs";


@IonicPage()
@Component({
  selector: 'page-godfathers',
  templateUrl: 'godfathers-list.html',
})
export class GodfathersPage {

  godfathers: any;
  godfathersDetailPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController,
              private userProvider: UserProvider) {
    this.godfathersDetailPage = GodfathersDetailPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GodfathersPage');
    this.userProvider.getGodfathers().then((res: any) => {
      res.subscribe( (data:any ) => {

        this.godfathers = data;

      });
    });
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(GodfathersPopoverPage);
    popover.present({
      ev: event
    });
  }

}
