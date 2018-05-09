import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SightingLatestPage } from './sighting-latest';

@NgModule({
  declarations: [
    SightingLatestPage,
  ],
  imports: [
    IonicPageModule.forChild(SightingLatestPage),
  ],
  exports: [
    SightingLatestPage
  ]
})
export class SightingLatestPageModule {}
