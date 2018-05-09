import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoadUpdatePage } from './road-update';

@NgModule({
  declarations: [
    RoadUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(RoadUpdatePage),
  ],
  exports: [
    RoadUpdatePage
  ]
})
export class RoadUpdatePageModule {}
