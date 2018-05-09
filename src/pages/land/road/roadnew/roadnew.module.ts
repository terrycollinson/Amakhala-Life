import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoadnewPage } from './roadnew';

@NgModule({
  declarations: [
    RoadnewPage,
  ],
  imports: [
    IonicPageModule.forChild(RoadnewPage),
  ],
  exports: [
    RoadnewPage
  ]
})
export class RoadnewPageModule {}
