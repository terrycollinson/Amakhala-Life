import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserStatusPage } from './user-status';

@NgModule({
  declarations: [
    UserStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(UserStatusPage),
  ],
  exports: [
    UserStatusPage
  ]
})
export class UserStatusPageModule {}
