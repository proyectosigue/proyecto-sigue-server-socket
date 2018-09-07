import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { AboutPopoverPage } from "./list/about-popover/about-popover";
import { New } from "../../../../models/new";
import { NewProvider } from "../../../providers/new/new";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  news: New[] = [];

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public newsProvider: NewProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
    this.fillNews();
  }

  fillNews(){
    this.newsProvider.getNews().subscribe((data: New[]) => {
      this.news = data;
      //console.log(data);
    });
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(AboutPopoverPage);
    popover.present({
      ev: event
    });
  }

}
