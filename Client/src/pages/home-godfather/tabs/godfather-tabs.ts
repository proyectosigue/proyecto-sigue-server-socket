import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NewsPage } from "../../news/news";

/**
 * Generated class for the GodfatherTabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-godfather-tabs',
  templateUrl: 'godfather-tabs.html'
})
export class GodfatherTabsPage {

  newsRoot = NewsPage;
  topicsRoot = 'TopicsPage';

  constructor(public navCtrl: NavController) {}

}
