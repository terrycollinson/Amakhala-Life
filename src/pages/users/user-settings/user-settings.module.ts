import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSettingsPage } from './user-settings';

@NgModule({
  declarations: [
    UserSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserSettingsPage),
  ],
  exports: [
    UserSettingsPage
  ]
})
export class UserSettingsPageModule {}
