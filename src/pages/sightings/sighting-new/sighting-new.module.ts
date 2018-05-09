import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';
import { SightingNewPage } from './sighting-new';
import { Ionic2RatingModule } from 'ionic2-rating';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { DirectivesModule } from '../../../directives/directives.module';

@NgModule({
  declarations: [
    SightingNewPage,
  ],
  imports: [
    IonicPageModule.forChild(SightingNewPage),
    Ionic2RatingModule,
    PipesModule,
    ComponentsModule,
    DirectivesModule,
  ],
  exports: [
    SightingNewPage
  ]
})
export class SightingNewPageModule {}
