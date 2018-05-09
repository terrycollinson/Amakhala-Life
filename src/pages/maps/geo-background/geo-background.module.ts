import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeoBackgroundPage } from './geo-background';

@NgModule({
  declarations: [
    GeoBackgroundPage,
  ],
  imports: [
    IonicPageModule.forChild(GeoBackgroundPage),
  ],
  exports: [
    GeoBackgroundPage
  ]
})
export class GeoBackgroundPageModule {}
