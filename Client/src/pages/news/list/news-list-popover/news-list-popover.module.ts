import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsListPopoverPage } from './news-list-popover';

@NgModule({
  declarations: [
    NewsListPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsListPopoverPage),
  ],
})
export class NewsListPopoverPageModule {}
