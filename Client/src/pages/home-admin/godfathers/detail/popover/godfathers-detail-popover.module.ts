import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GodfathersDetailPopoverPage } from './godfathers-detail-popover';

@NgModule({
  declarations: [
    GodfathersDetailPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(GodfathersDetailPopoverPage),
  ],
})
export class GodfathersDetailPopoverPageModule {}
