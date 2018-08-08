import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Conversation } from "../../../../../models/conversation";
import {ThreadProvider} from "../../../../../providers/thread/thread";

@IonicPage()
@Component({
  selector: 'page-godfather-topic-detail',
  templateUrl: 'godfather-topic-detail.html',
})
export class GodfatherTopicDetailPage {

  conversation: Conversation = new Conversation();

  constructor(public navCtrl: NavController, public navParams: NavParams, private threadProvider : ThreadProvider) {
    this.conversation.subject = this.navParams.data.subject;
    this.conversation.godfather = this.navParams.data.godfather;
    this.conversation.godfatherId = this.navParams.data.godfather_id;
    this.conversation.threadId = this.navParams.data.thread_id;
    this.conversation.message = "";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GodfatherTopicDetailPage');
  }

  sendMessage(){
    this.threadProvider.storeThreadMessage(
      this.conversation.godfatherId, this.conversation.threadId, {'body':  this.conversation.message})
  }

}
