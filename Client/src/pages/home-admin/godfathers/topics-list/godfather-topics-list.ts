import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import { GodfatherTopicsListPopoverPage } from "./popover/godfather-topics-list-popover";
import {GodfatherProvider} from "../../../../providers/godfather/godfather";
import {ThreadProvider} from "../../../../providers/thread/thread";

/**
 * Generated class for the GodfatherTopicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-godfather-topic',
  templateUrl: 'godfather-topics-list.html',
})
export class GodfatherTopicsListPage {

  godfather: any;
  threads: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController,
              private threadProvider: ThreadProvider, public events: Events) {
    this.godfather = this.navParams.data;
  }

  ionViewDidLoad() {
    this.subscribeCreateEvent();
    this.subscribeDeleteAllEvent();
  }

  ionViewWillEnter(){
    this.fillAllUserThreads();
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(GodfatherTopicsListPopoverPage, this.godfather);
    popover.present({
      ev: event
    });
  }

  fillAllUserThreads() {
    this.threadProvider.getAllUserThreads(this.godfather.id).subscribe((data: any) => {
      this.threads = data;
    });
  }

  subscribeCreateEvent(){
    this.events.subscribe('threads:create', (godfather, subject) => {
      console.log('CREAR');
      console.log(godfather);
      console.log(subject);
    });
  }

  subscribeDeleteAllEvent(){
    this.events.subscribe('threads:delete-all', (godfather) => {
      this.threadProvider.deleteAllUserThreads(godfather.id).subscribe((data: any) => {
        this.fillAllUserThreads();
      });
    });
  }

}
