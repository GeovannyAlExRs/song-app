import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchService } from '@modules/history/services/search.service';
import { TrackService } from '@modules/tracks/service/track.service';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {

  listResults$: Observable<any> = of([])

  src: string = ''

  constructor(private _searchService: SearchService) {}

  ngOnInit(): void {
  }

  receiveData(event: string): void {
    console.log('Estoy desde el padre: ', event);
    this.src = event
    // SIRVE PARA BUSCAR UN DATO EN ESPECIFICO
    /*this.listResults$ = this._searchService.searchTracks$(event).pipe(
      map((dataRaw) => {
        // PRIMERA FORMA
        const list = dataRaw.data.filter((u: any) => {
          if( (u.name.toLowerCase().indexOf(event.toLowerCase()) > -1) ||
              (u.album.toLowerCase().indexOf(event.toLowerCase()) > -1) ||
              (u.artist.name.toLowerCase().indexOf(event.toLowerCase()) > -1)) {
            console.log('entro CANCION ', u.name);
            return u
          }
        })
        console.log(list);
        return list
        //SEGUNDA FORMA
        event = event.toLowerCase()
        const list2 = dataRaw.data.filter((u: any) => {
          const listemp = JSON.stringify(u.name).toLowerCase().includes(event)
          console.info('list Temp ',listemp);

          return listemp
        })
        console.log('LISTA ', list2);

        return list2
      })
    )*/
  }
}
