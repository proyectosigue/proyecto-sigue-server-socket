import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
import { GodfathersPage } from '../godfathers/godfathers';
import { GodsonsPage } from '../godsons/godsons';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = AboutPage;
  tab2Root = GodfathersPage;
  tab3Root = GodsonsPage;

  constructor() {}
}
