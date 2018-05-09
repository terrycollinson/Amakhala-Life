import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReserveMapPage } from './reserve-map';

@NgModule({
  declarations: [
    ReserveMapPage,
  ],
  imports: [
    IonicPageModule.forChild(ReserveMapPage),
  ],
  exports: [
    ReserveMapPage
  ]
})
export class ReserveMapPageModule {}
