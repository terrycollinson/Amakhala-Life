import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SightingMyPage } from './sighting-my';

@NgModule({
  declarations: [
    SightingMyPage,
  ],
  imports: [
    IonicPageModule.forChild(SightingMyPage),
  ],
  exports: [
    SightingMyPage
  ]
})
export class SightingMyPageModule {}
