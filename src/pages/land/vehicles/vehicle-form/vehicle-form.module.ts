import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleFormPage } from './vehicle-form';

@NgModule({
  declarations: [
    VehicleFormPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleFormPage),
  ],
  exports: [
    VehicleFormPage
  ]
})
export class VehicleFormPageModule {}
