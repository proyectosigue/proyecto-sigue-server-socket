import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import {AboutPopoverPage} from "./list/about-popover/about-popover";
import {NewsProvider} from "../../../../providers/new/new";
import {New} from "../../../../models/new";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  news: New[] = [];

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
    this.fillNews();
  }

  fillNews(){
    this.newsProvider.getGodfathers().subscribe((data: New[]) => {
      this.news = data;
    });
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(AboutPopoverPage);
    popover.present({
      ev: event
    });
  }

}
