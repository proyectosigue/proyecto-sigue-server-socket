import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GodfathersDetailPage } from './godfathers-detail';

@NgModule({
  declarations: [
    GodfathersDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(GodfathersDetailPage),
  ],
})
export class GodfathersDetailPageModule {}
