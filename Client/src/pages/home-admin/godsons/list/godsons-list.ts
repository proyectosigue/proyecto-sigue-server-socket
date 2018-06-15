import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NativeStorage} from "@ionic-native/native-storage";
import {GodsonProvider} from "../../../../providers/godson/godson";
import {GodsonsDetailPage} from "../detail/godsons-detail";
import {GodsonsPopoverPage} from "./popover/godsons-popover";

/**
 * Generated class for the GodsonsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-godsons',
  templateUrl: 'godsons-list.html',
})
export class GodsonsPage {

  godsons: any;
  godsonsDetailPage: any;

  constructor(public http: HttpClient, private godsonProvider: GodsonProvider, public popoverCtrl: PopoverController) {
    this.godsonsDetailPage = GodsonsDetailPage;
    this.loadGodsons();
  }

  private loadGodsons(){
    this.godsonProvider.getGodsons().then((res: any) => {
      res.subscribe( (data:any ) => {

        this.godsons = data;

      });
    });
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(GodsonsPopoverPage);
    popover.present({
      ev: event
    });
  }

}
