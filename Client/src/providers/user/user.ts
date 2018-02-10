import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {TabsPage} from "../../pages/tabs/tabs";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  apiURL;
  signInURL;

  constructor(public http: HttpClient) {
    this.apiURL = "http://localhost:8000";
    this.signInURL = "/login";
  }

  validateUser(email, password){
    let self = this;
    let _options = { headers: new HttpHeaders() };
    let userData = {"email": email, "password": password };
    let response = [];
    return this.http.post(this.apiURL + this.signInURL, userData, _options);
  }

}
