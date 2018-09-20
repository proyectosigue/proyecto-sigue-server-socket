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
  POST_NEWS: string;

  constructor(public http: HttpClient, private singletonService: Singleton) {
    console.log('Hello NewProvider Provider');
    this.GET_NEWS = "events";
    this.POST_NEWS = "events";
  }

  registerNew(eventData){
    return this.singletonService.post(this.POST_NEWS, eventData, false);
  }

  getNews(){
    return this.singletonService.get(this.GET_NEWS);
  }

}
