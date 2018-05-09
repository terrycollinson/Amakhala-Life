import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InjuryPage } from './injury';

@NgModule({
  declarations: [
    InjuryPage,
  ],
  imports: [
    IonicPageModule.forChild(InjuryPage),
  ],
  exports: [
    InjuryPage
  ]
})
export class InjuryPageModule {}
