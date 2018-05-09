import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WildlifeTaxonomyPage } from './wildlife-taxonomy';

@NgModule({
  declarations: [
    WildlifeTaxonomyPage,
  ],
  imports: [
    IonicPageModule.forChild(WildlifeTaxonomyPage),
  ],
  exports: [
    WildlifeTaxonomyPage
  ]
})
export class WildlifeTaxonomyPageModule {}
