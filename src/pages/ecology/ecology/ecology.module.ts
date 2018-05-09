import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EcologyPage } from './ecology';

@NgModule({
  declarations: [
    EcologyPage,
  ],
  imports: [
    IonicPageModule.forChild(EcologyPage),
  ],
  exports: [
    EcologyPage
  ]
})
export class EcologyPageModule {}
