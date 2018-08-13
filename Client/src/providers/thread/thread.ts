import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {NativeStorage} from "@ionic-native/native-storage";
import {Singleton} from "../singleton/singleton";
import {Observable} from "rxjs";
import {Thread} from "../../models/thread";

@Injectable()
export class ThreadProvider {
  private DELETE_ALL_USER_THREADS: string;
  private GET_ALL_USER_THREADS: string;
  private STORE_USER_THREAD: string;
  private STORE_THREAD_MESSAGE : string;
  private GET_THREAD_MESSAGES : string;

  constructor(public http: HttpClient, private nativeStorage: NativeStorage, private singletonService: Singleton) {
    console.log('Hello GodfatherProvider Provider');
  }

  storeUserThead(receiverId: number, data: any){
    this.STORE_USER_THREAD = "threads/messages/" + receiverId;
    return this.singletonService.post(this.STORE_USER_THREAD, data);
  }

  getAllUserThreads(id: number) {
    this.GET_ALL_USER_THREADS = "threads/" + id;
    return this.singletonService.get(this.GET_ALL_USER_THREADS);
  }

  deleteAllUserThreads(id: number){
    this.DELETE_ALL_USER_THREADS = "threads/" + id + "/delete-all";
    return this.singletonService.delete(this.DELETE_ALL_USER_THREADS);
  }

  storeThreadMessage(receiverId: number, threadId: number, data: object){
    this.STORE_THREAD_MESSAGE = "message/" + threadId + "/user/" + receiverId;
    return this.singletonService.post(this.STORE_THREAD_MESSAGE, data);
  }

  getThreadMessages(threadId: number, lastMessageId?: Number) {
    this.GET_THREAD_MESSAGES = lastMessageId ? ("threads/" + threadId + "/messages/" + lastMessageId) : ("threads/" + threadId + "/messages");
    return this.singletonService.get(this.GET_THREAD_MESSAGES);
  }

}
