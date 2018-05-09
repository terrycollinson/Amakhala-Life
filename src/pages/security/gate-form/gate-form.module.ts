import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GateFormPage } from './gate-form';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    GateFormPage,
    ],
  imports: [
    IonicPageModule.forChild(GateFormPage),
     Ionic2RatingModule, // 62544055959
  ],
})
export class GateFormPageModule {}
