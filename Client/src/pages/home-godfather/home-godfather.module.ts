import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeUserPage } from './home-godfather';

@NgModule({
  declarations: [
    HomeUserPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeUserPage),
  ],
})
export class HomeUserPageModule {}
