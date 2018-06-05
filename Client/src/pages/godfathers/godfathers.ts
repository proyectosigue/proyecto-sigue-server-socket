import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {GodfathersPopoverPage} from "../godfathers-popover/godfathers-popover";
import {RegisterPage} from "../register/register";
import {UserProvider} from "../../providers/user/user";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the GodfathersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-godfathers',
  templateUrl: 'godfathers.html',
})
export class GodfathersPage {

  godfathers: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController,
              private userProvider: UserProvider) {
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
