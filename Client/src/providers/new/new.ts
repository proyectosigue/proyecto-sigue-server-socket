import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {NativeStorage} from "@ionic-native/native-storage";
import {Singleton} from "../singleton/singleton";

@Injectable()
export class UserProvider {

  REGISTER_NEW = "news/store";

  constructor(public http: HttpClient, private nativeStorage: NativeStorage, private singletonService: Singleton) {}

  registerNew(newData) {
    return this.singletonService.post(this.REGISTER_NEW, newData, false);
  }

}
