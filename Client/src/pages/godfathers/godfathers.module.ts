import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GodfathersPage } from './godfathers';

@NgModule({
  declarations: [
    GodfathersPage,
  ],
  imports: [
    IonicPageModule.forChild(GodfathersPage),
  ],
})
export class GodfathersPageModule {}
