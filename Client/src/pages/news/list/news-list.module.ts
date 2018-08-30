import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewListsPage } from './news-list';

@NgModule({
  declarations: [
    NewListsPage,
  ],
  imports: [
    IonicPageModule.forChild(NewListsPage),
  ],
})
export class NewListsPageModule {}
