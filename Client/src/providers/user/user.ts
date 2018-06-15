import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {NativeStorage} from "@ionic-native/native-storage";
import {Singleton} from "../singleton/singleton";

@Injectable()
export class UserProvider {

  LOGIN = "login";
  SIGN_UP = "godfathers/sign-up";

  constructor(public http: HttpClient, private nativeStorage: NativeStorage, private singletonService: Singleton) {}

  validateUser(email, password){
    let userData = { "email": email, "password": password };
    return this.singletonService.post(this.LOGIN, userData, false);
  }

  signUp(userData) {
    return this.singletonService.post(this.SIGN_UP, userData, false);
  }

}
