import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {TabsPage} from "../../pages/tabs/tabs";
import {NativeStorage} from "@ionic-native/native-storage";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  apiURL;
  signInURL;
  getGodfathersURL;

  constructor(public http: HttpClient, private nativeStorage: NativeStorage) {
    this.apiURL = "http://localhost:8000";
    this.signInURL = "/login";
    this.getGodfathersURL = "/users/godfathers";
  }

  validateUser(email, password){
    let _options = { headers: new HttpHeaders() };
    let userData = {"email": email, "password": password };
    return this.http.post(this.apiURL + this.signInURL, userData, _options);
  }

  getGodfathers(){
    return new Promise((resolve) => {
      this.nativeStorage.getItem("session").then(res => {
        let body = { "email": res["email"],"password": res["password"] };
        let _options = {headers: new HttpHeaders()};
        resolve(this.http.post(this.apiURL + this.getGodfathersURL, body, _options));
      });
    });
  }

}
