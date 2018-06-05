import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {NativeStorage} from "@ionic-native/native-storage";

/*
  Generated class for the GodsonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GodsonProvider {

  apiURL: string;
  getGodsonsURL: string;

  constructor(public http: HttpClient, private nativeStorage: NativeStorage) {
    this.apiURL = "http://localhost:8010";
    this.getGodsonsURL = "/godsons";
  }

  getGodsons(){
    return new Promise((resolve) => {
      this.nativeStorage.getItem("session").then(res => {

        let headers = new HttpHeaders();
        headers = headers.append('Content-Type','application/json');
        headers = headers.append('Accept','application/json');
        headers = headers.append('Authorization', 'Bearer ' + res.token);
        let _options = { headers: headers };

        resolve(this.http.get(this.apiURL + this.getGodsonsURL, _options));
      });
    });
  }

}
