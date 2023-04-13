import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TrackModel } from '@core/models/tracks.model';

//import * as dataRaw from '../../../data/tracks.json';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api;

  dataTracksTrending$: Observable<TrackModel[]> = of([])
  dataTracksRandom$: Observable<any> = of([])

  constructor(private _httpClient: HttpClient) {

    /**
     * ** EXAMPLE DATA DINAMIC TRAKC.JSON
    const { data }: any = (dataRaw as any).default
    this.dataTracksTrending$ = of(data)

    this.dataTracksRandom$ = new Observable(
      (observer)=>{

        const trackExample: TrackModel ={
            _id: 9,
            name: "LEVE @@@",
            album: "Cartel de Santa",
            cover: "https://jenesaispop.com/wp-content/uploads/2009/09/guetta_onelove.jpg",
            url: "http://localhost:3000/track.mp3"
        }

        setTimeout(() => {
          observer.next([trackExample])
        }, 3000)
      })
      */
  }

  getAllTracks$(): Observable<any> {
    return this._httpClient.get(`${this.URL}/tracks`)
  }
}
