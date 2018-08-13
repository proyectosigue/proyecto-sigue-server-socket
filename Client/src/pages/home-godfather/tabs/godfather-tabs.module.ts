import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GodfatherTabsPage } from './godfather-tabs';

@NgModule({
  declarations: [
    GodfatherTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(GodfatherTabsPage),
  ]
})
export class GodfatherTabsPageModule {}
