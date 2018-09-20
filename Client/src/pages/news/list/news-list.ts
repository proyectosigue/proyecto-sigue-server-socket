import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { NewsListPopoverPage } from "./news-list-popover/news-list-popover";
import { NewProvider } from "../../../providers/new/new";
import { New } from "../../../models/new";

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news-list.html',
})
export class NewsListPage {

  news: New[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController,
              private newsProvider: NewProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsListPage');
    this.fillNews();
  }

  fillNews(){
    this.newsProvider.getNews().subscribe((data: New[]) => {
      this.news = data;
    });
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(NewsListPopoverPage);
    popover.present({
      ev: event
    });
  }

}
