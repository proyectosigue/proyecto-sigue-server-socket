import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ThreadProvider} from "../../../../../providers/thread/thread";
import {Thread} from "../../../../../models/thread";
import {Message} from "../../../../../models/message";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {Observer, Subscription} from "rxjs";

@IonicPage()
@Component({
  selector: 'page-godfather-topic-detail',
  templateUrl: 'godfather-topic-detail.html',
})
export class GodfatherTopicDetailPage {

  thread: Thread;
  bodyMessage: string;

  messagesSubscription: Subscription;
  messagesObserver: Observer<Message[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private threadProvider: ThreadProvider) {
    this.thread = this.navParams.data.thread;
    this.thread.messages = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GodfatherTopicDetailPage');
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter GodfatherTopicDetailPage');
    this.startMessageListening();
  }

  ionViewDidLeave(){
    console.log('ionViewDidLeave GodfatherTopicDetailPage');
    this.messagesSubscription.unsubscribe();
  }

  sendMessage() {
    this.threadProvider.storeThreadMessage(
      this.thread.user_id_issuing, this.thread.id, {'body': this.bodyMessage}
    ).subscribe((response) => {
      console.log(response);
    });
    this.bodyMessage = ""
  }

  startMessageListening() {

    this.messagesObserver = {
      next: (response: Message[]) => {
        for (let message of response) {
          if (this.lastMessageId() < message.id)
            this.thread.messages.push(new Message().deserialize(message));
        }
      },
      error: (err: any) => { console.log(err) },
      complete: () => {}
    };

    this.messagesSubscription = TimerObservable.create(0, 5000).subscribe(() => {
      this.threadProvider.getThreadMessages(this.thread.id, this.lastMessageId()).subscribe(this.messagesObserver);
    });

  }

  lastMessageId(): Number {
    return (this.thread.messages === undefined || this.thread.messages.length === 0) ? 0 : this.thread.messages[this.thread.messages.length - 1].id;
  }

}
