import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapMarkerOptionsPage } from './map-marker-options';

@NgModule({
  declarations: [
    MapMarkerOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(MapMarkerOptionsPage),
  ],
  exports: [
    MapMarkerOptionsPage
  ]
})
export class MapMarkerOptionsPageModule {}
