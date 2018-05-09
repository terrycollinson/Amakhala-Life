import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WildlifeClassisPage } from './wildlife-classis';

@NgModule({
  declarations: [
    WildlifeClassisPage,
  ],
  imports: [
    IonicPageModule.forChild(WildlifeClassisPage),
  ],
  exports: [
    WildlifeClassisPage
  ]
})
export class WildlifeClassisPageModule {}
