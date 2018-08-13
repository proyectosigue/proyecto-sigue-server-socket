import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from "@ionic-native/native-storage";
import { Singleton } from "../singleton/singleton";
import {Platform} from "ionic-angular";

@Injectable()
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

}
