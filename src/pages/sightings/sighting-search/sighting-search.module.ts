import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SightingSearchPage } from './sighting-search';

@NgModule({
  declarations: [
    SightingSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(SightingSearchPage),
  ],
  exports: [
    SightingSearchPage
  ]
})
export class SightingSearchPageModule {}
