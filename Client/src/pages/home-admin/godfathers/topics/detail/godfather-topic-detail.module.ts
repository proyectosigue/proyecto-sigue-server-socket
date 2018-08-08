import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GodfatherTopicDetailPage } from './godfather-topic-detail';

@NgModule({
  declarations: [
    GodfatherTopicDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(GodfatherTopicDetailPage),
  ],
})
export class GodfatherTopicDetailPageModule {}
