import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {NewProvider} from "../../../providers/new/new";
import {New} from "../../../models/new";

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
    /*let popover = this.popoverCtrl.create(GodfathersPopoverPage);
    popover.present({
      ev: event
    });*/
  }

}
