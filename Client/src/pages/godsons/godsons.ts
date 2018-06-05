import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NativeStorage} from "@ionic-native/native-storage";
import {GodsonProvider} from "../../providers/godson/godson";

/**
 * Generated class for the GodsonsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-godsons',
  templateUrl: 'godsons.html',
})
export class GodsonsPage {

  godsons: any;

  constructor(public http: HttpClient, private godsonProvider: GodsonProvider) {
    this.loadGodsons();
  }

  private loadGodsons(){
    console.log('ionViewDidLoad GodfathersPage');
    this.godsonProvider.getGodsons().then((res: any) => {
      res.subscribe( (data:any ) => {

        this.godsons = data;

      });
    });
  }

}
