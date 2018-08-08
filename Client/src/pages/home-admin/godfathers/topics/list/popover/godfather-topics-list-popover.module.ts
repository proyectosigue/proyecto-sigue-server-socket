import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GodfatherTopicsListPopoverPage } from './godfather-topics-list-popover';

@NgModule({
  declarations: [
    GodfatherTopicsListPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(GodfatherTopicsListPopoverPage),
  ],
})
export class GodfatherTopicsListPopoverPageModule {}
