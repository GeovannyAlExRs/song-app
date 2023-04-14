import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryPageComponent } from './page/history-page/history-page.component';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [
    HistoryPageComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule
  ]
})
export class HistoryModule { }
