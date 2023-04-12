import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TrackModel } from '@core/models/tracks.model';

import * as dataRaw from '../../../data/tracks.json';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  dataTracksTrending$: Observable<TrackModel[]> = of([])
  dataTracksRandom$: Observable<any> = of([])

  constructor() {
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
  }
}
