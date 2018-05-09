import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSightingHistoryPage } from './user-sighting-history';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    UserSightingHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(UserSightingHistoryPage),
    PipesModule
  ],
  exports: [
    UserSightingHistoryPage
  ]
})
export class UserSightingHistoryPageModule {}
