import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SourcesPage } from './sources';

@NgModule({
  declarations: [
    SourcesPage,
  ],
  imports: [
    IonicPageModule.forChild(SourcesPage),
  ],
})
export class SourcesPageModule {}
