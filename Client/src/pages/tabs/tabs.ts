import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = AboutPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(public navParams: NavParams, public nativeStorage: NativeStorage) {
    console.log(navParams);
    console.log(this.nativeStorage.getItem("session"));
  }
}
