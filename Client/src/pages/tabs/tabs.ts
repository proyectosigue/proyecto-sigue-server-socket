import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
import { GodfathersPage } from '../godfathers/list/godfathers-list';
import { GodsonsPage } from '../godsons/list/godsons-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = AboutPage;
  tab2Root = GodfathersPage;
  tab3Root = GodsonsPage;

  constructor() {}
}
