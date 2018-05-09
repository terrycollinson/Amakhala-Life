import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaintainPage } from './maintain';

@NgModule({
  declarations: [
    MaintainPage,
  ],
  imports: [
    IonicPageModule.forChild(MaintainPage),
  ],
  exports: [
    MaintainPage
  ]
})
export class MaintainPageModule {}
