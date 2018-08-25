import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import {AboutPopoverPage} from "./list/about-popover/about-popover";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController) {
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(AboutPopoverPage);
    popover.present({
      ev: event
    });
  }

}
