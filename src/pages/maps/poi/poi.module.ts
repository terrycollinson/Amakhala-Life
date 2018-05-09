import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PoiPage } from './poi';

@NgModule({
  declarations: [
    PoiPage,
  ],
  imports: [
    IonicPageModule.forChild(PoiPage),
  ],
  exports: [
    PoiPage
  ]
})
export class PoiPageModule {}
