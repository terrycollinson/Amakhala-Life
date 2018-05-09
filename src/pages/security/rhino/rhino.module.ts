import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RhinoPage } from './rhino';

@NgModule({
  declarations: [
    RhinoPage,
  ],
  imports: [
    IonicPageModule.forChild(RhinoPage),
  ],
  exports: [
    RhinoPage
  ]
})
export class RhinoPageModule {}
