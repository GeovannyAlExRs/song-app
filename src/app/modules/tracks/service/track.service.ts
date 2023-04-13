import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

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

  // GET ALL TRACKS
  getAllTracks$(): Observable<any> {
    return this._httpClient.get(`${this.URL}/tracks`).pipe(
      map(({ data }: any) => {
        return data
      })
    )
  }

  // GET ALL TRACKS RANDOM
  getAllTracksRandom$(): Observable<any> {
    return this._httpClient.get(`${this.URL}/tracksERROR`)
    .pipe(
      // Devuelve la lista de canciones alrevez
      //map(({ data }: any) => { return data.reverse() })
      // Devuelve la lista de canciones alrevez y filtra por ID Diferente (Oculta tracks)
      mergeMap(({ data }: any) => this._skipById(data, 1)),
      catchError((err) => {
        const { status, statusText } = err
        console.error('ERROR AL CARGAR LAS MUSICAS ', [status, statusText])
        return of([])
      })
    )
  }

  private _skipById(listTracks: TrackModel[], id: number | string): Promise<TrackModel[]> {
    return new Promise((resolve, reject) =>{
      const listTmp = listTracks.filter(a => a._id != id)
      resolve(listTmp)
    })
  }
}
