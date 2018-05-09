import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KillingPage } from './killing';

@NgModule({
  declarations: [
    KillingPage,
  ],
  imports: [
    IonicPageModule.forChild(KillingPage),
  ],
  exports: [
    KillingPage
  ]
})
export class KillingPageModule {}
