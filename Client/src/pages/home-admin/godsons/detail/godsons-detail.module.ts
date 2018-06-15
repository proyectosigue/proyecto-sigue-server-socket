import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GodsonsDetailPage } from './godsons-detail';

@NgModule({
  declarations: [
    GodsonsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(GodsonsDetailPage),
  ],
})
export class GodsonsDetailPageModule {}
