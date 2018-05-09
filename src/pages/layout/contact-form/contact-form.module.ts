import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactFormPage } from './contact-form';

@NgModule({
  declarations: [
    ContactFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactFormPage),
  ],
  exports: [
    ContactFormPage
  ]
})
export class ContactFormPageModule {}
