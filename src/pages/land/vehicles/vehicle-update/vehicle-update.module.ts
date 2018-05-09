import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleUpdatePage } from './vehicle-update';

@NgModule({
  declarations: [
    VehicleUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleUpdatePage),
  ],
  exports: [
    VehicleUpdatePage
  ]
})
export class VehicleUpdatePageModule {}
