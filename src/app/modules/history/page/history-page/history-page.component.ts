import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchService } from '@modules/history/services/search.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {

  listResults$: Array<TrackModel> = []

  constructor(private _searchService: SearchService) {}

  ngOnInit(): void {}

  receiveData(event: string): void {
    console.log('Estoy desde el padre: ', event);
    this._searchService.searchTracks$(event).subscribe(
      ({ data }) => {
        this.listResults$ = data
        console.log(' BUSCANDO...: ', data);
      }
    )
  }
}
