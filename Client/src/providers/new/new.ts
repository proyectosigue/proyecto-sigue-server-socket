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
