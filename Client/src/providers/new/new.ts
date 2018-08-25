import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {NativeStorage} from "@ionic-native/native-storage";
import {Singleton} from "../singleton/singleton";

@Injectable()
export class NewProvider {

  STORE_NEW: string;

  constructor(public http: HttpClient, private nativeStorage: NativeStorage, private singletonService: Singleton) {
    this.STORE_NEW = "news";
  }

  registerNew(newData) {
    return this.singletonService.post(this.STORE_NEW, newData);
  }

}
