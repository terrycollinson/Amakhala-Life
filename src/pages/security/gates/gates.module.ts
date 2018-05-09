import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GatesPage } from './gates';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    GatesPage,
  ],
  imports: [
    IonicPageModule.forChild(GatesPage),
    PipesModule,
  ],
  exports: [
    GatesPage
  ]
})
export class GatesPageModule {}
