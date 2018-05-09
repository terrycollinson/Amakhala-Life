import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SightingDetailPage } from './sighting-detail';

@NgModule({
  declarations: [
    SightingDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SightingDetailPage),
  ],
  exports: [
    SightingDetailPage
  ]
})
export class SightingDetailPageModule {}
