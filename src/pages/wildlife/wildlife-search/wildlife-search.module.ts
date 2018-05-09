import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WildlifeSearchPage } from './wildlife-search';

@NgModule({
  declarations: [
    WildlifeSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(WildlifeSearchPage),
  ],
  exports: [
    WildlifeSearchPage
  ]
})
export class WildlifeSearchPageModule {}
