import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import { GodfatherTopicsListPopoverPage } from "./popover/godfather-topics-list-popover";
import {ThreadProvider} from "../../../../../providers/thread/thread";
import {GodfatherTopicDetailPage} from "../detail/godfather-topic-detail";
import {IThread, Thread} from "../../../../../models/thread";

@IonicPage()
@Component({
  selector: 'page-godfather-topic',
  templateUrl: 'godfather-topics-list.html',
})
export class GodfatherTopicsListPage {

  godfather: any;
  threads: Thread[];

  godfatherTopicDetailPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController,
              private threadProvider: ThreadProvider, public events: Events) {
    this.threads = [];
    this.godfather = this.navParams.data;
    this.godfatherTopicDetailPage = GodfatherTopicDetailPage;
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
    this.threadProvider.getAllUserThreads(this.godfather.id).subscribe((data: IThread[]) => {;
      for(let thread of data)
        this.threads.push(new Thread().deserialize(thread));
    });
  }

  subscribeCreateEvent(){

    this.events.subscribe('threads:create', (godfather, subject) => {

      let requestParams = {'subject': subject };
      this.threadProvider.storeUserThead(godfather.id, requestParams).subscribe( (data: any) => {

        let pushParams = { thread: data.thread, subject: subject, godfather: godfather };
        this.navCtrl.push(GodfatherTopicDetailPage, pushParams);

      });
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
