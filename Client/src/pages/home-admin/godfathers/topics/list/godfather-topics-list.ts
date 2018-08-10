import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {GodfatherTopicsListPopoverPage} from "./popover/godfather-topics-list-popover";
import {ThreadProvider} from "../../../../../providers/thread/thread";
import {GodfatherTopicDetailPage} from "../detail/godfather-topic-detail";
import {Thread} from "../../../../../models/thread";

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
    this.fillAllUserThreads();
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(GodfatherTopicsListPopoverPage, this.godfather);
    popover.present({
      ev: event
    });
  }

  fillAllUserThreads() {
    this.threadProvider.getAllUserThreads(this.godfather.id).subscribe((data: Thread[]) => {
      for (let thread of data) {
        if (this.newerThread(thread.id))
          this.threads.push(new Thread().deserialize(thread));
      }
      console.log(this.threads);
    });
  }

  newerThread(id: number){
    return this.threads.length == 0  || this.threads[this.threads.length - 1].id < id;
  }

  subscribeCreateEvent() {
    this.events.subscribe('threads:create', (godfather, subject) => {

      let requestParams = {'subject': subject};
      this.threadProvider.storeUserThead(godfather.id, requestParams).subscribe((data: any) => {

        let pushParams = {thread: data.thread, subject: subject, godfather: godfather};
        this.navCtrl.push(GodfatherTopicDetailPage, pushParams);

      });
    });
  }

  subscribeDeleteAllEvent() {
    this.events.subscribe('threads:delete-all', (godfather) => {
      this.threadProvider.deleteAllUserThreads(godfather.id).subscribe((data: any) => {
        this.fillAllUserThreads();
      });
    });
  }

}
