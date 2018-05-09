import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoadsPage } from './roads';

@NgModule({
  declarations: [
    RoadsPage,
  ],
  imports: [
    IonicPageModule.forChild(RoadsPage),
  ],
  exports: [
    RoadsPage
  ]
})
export class RoadsPageModule {}
