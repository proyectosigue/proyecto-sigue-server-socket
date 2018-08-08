import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GodfatherTopicsListPage } from './godfather-topics-list';
import {TruncateModule} from "ng2-truncate";

@NgModule({
  declarations: [
    GodfatherTopicsListPage,
  ],
  imports: [
    IonicPageModule.forChild(GodfatherTopicsListPage),
    TruncateModule,
  ],
})
export class GodfatherTopicsListPageModule {}
