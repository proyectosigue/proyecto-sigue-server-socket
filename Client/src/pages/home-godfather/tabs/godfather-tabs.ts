import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { NewsPage } from "../../news/news";
import { GodfatherTopicsListPage } from "../../home-admin/godfathers/topics/list/godfather-topics-list";
import {Godfather} from "../../../models/godfather";

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

  godfather: Godfather;
  newsRoot = NewsPage;
  topicsRoot = GodfatherTopicsListPage;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.godfather = this.navParams.data;
  }

}
