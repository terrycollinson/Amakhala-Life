import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameCountPage } from './game-count';

@NgModule({
  declarations: [
    GameCountPage,
  ],
  imports: [
    IonicPageModule.forChild(GameCountPage),
  ],
  exports: [
    GameCountPage
  ]
})
export class GameCountPageModule {}
