import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehiclePage } from './vehicle';
// import { PipesModule } from '../../../../pipes/pipes.module';
// import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    VehiclePage,
  ],
  imports: [
    IonicPageModule.forChild(VehiclePage),
  //  PipesModule,
  //  ComponentsModule
  ],
  exports: [
    VehiclePage
  ]
})
export class VehiclePageModule {}
