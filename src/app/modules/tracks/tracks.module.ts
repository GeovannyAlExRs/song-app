import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TracksRoutingModule } from './tracks-routing.module';
import { TracksPageComponent } from './page/tracks-page/tracks-page.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    TracksPageComponent
  ],
  imports: [
    CommonModule,
    TracksRoutingModule,
    SharedModule
  ]
})
export class TracksModule { }
