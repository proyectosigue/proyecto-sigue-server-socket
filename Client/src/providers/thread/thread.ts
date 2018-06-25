import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {NativeStorage} from "@ionic-native/native-storage";
import {Singleton} from "../singleton/singleton";

@Injectable()
export class ThreadProvider {
  DELETE_ALL_USER_THREADS: string;
  GET_ALL_USER_THREADS: string;

  constructor(public http: HttpClient, private nativeStorage: NativeStorage, private singletonService: Singleton) {
    console.log('Hello GodfatherProvider Provider');
  }

  getAllUserThreads(id: number){
    this.GET_ALL_USER_THREADS = "threads/" + id;
    return this.singletonService.get(this.GET_ALL_USER_THREADS);
  }

  deleteAllUserThreads(id: number){
    this.DELETE_ALL_USER_THREADS = "threads/" + id + "/delete-all";
    return this.singletonService.delete(this.DELETE_ALL_USER_THREADS);
  }

}
