import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ThreadProvider} from "../../../../../providers/thread/thread";
import {Godfather} from "../../../../../models/godfather";
import {IThread, Thread} from "../../../../../models/thread";
import {IMessage, Message} from "../../../../../models/message";
import {catchError, map} from "rxjs/operators";

@IonicPage()
@Component({
  selector: 'page-godfather-topic-detail',
  templateUrl: 'godfather-topic-detail.html',
})
export class GodfatherTopicDetailPage {

  thread: Thread;
  bodyMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private threadProvider : ThreadProvider) {
    this.thread = this.navParams.data.thread;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GodfatherTopicDetailPage');
  }

  ngOnInit(){
    this.refreshMessages();
  }

  sendMessage(){
    this.threadProvider.storeThreadMessage(
      this.thread.user_id_issuing, this.thread.id, {'body':  this.bodyMessage }
      ).subscribe((response) => {
        console.log(response);
    });
    this.bodyMessage = ""
  }

  refreshMessages(){
    if(this.thread.messages.length > 0) {
      this.threadProvider.getThreadMessages(this.thread.id).subscribe((response: any[]) => {
        for(let object of response){
          this.thread.messages.push(new Message().deserialize(object));
        }
      });
    }
  }

}
