import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WildlifeEditPage } from './wildlife-edit';

@NgModule({
  declarations: [
    WildlifeEditPage,
  ],
  imports: [
    IonicPageModule.forChild(WildlifeEditPage),
  ],
  exports: [
    WildlifeEditPage
  ]
})
export class WildlifeEditPageModule {}
