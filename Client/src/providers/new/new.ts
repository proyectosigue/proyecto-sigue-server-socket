import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Singleton } from "../singleton/singleton";

/*
  Generated class for the NewProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewProvider {

  GET_NEWS: string;

  constructor(public http: HttpClient, private singletonService: Singleton) {
    console.log('Hello NewProvider Provider');
    this.GET_GODFATHERS = "events";
  }

  getGodfathers(){
    return this.singletonService.get(this.GET_NEWS, true);
  }

}

/*
export class GodfatherProvider {

  GET_GODFATHERS: string;
  UPLOAD_PROFILE_IMAGE: string;

  constructor(public http: HttpClient, private nativeStorage: NativeStorage, private singletonService: Singleton,
              private platform: Platform) {
    console.log('Hello GodfatherProvider Provider');
    this.GET_GODFATHERS = "godfathers";
  }

  getGodfathers(){
    return this.singletonService.get(this.GET_GODFATHERS);
  }

  uploadProfileImage(formModel, userId){
    this.UPLOAD_PROFILE_IMAGE = "/godfathers/" + userId + "/upload-profile-image";
    return this.singletonService.post(this.UPLOAD_PROFILE_IMAGE, formModel);
  }


*/
