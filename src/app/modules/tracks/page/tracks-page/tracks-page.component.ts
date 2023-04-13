import { Component, OnDestroy, OnInit } from '@angular/core';

import { TrackModel } from '@core/models/tracks.model';

import { TrackService } from '@modules/tracks/service/track.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy {

  tracksTrending:Array<TrackModel> =[]
  tracksRandom:Array<TrackModel> =[]

  listObservers$: Array<Subscription> = []

  constructor(private _trackService:TrackService) {}

  ngOnInit(): void {

    this.loadDataAll()
    //this.loadDataReverse()

    /*
    ** EXAMPLE DATA SET **
    const { data }:any = (dataRaw as any).default
    this.mockTrackList = data
    console.log(data)

    ** EXAMPLE DATA TRACKS.JSON **
    const observer1$ = this._trackService.dataTracksTrending$.subscribe(
      (response) => {
        this.tracksTrending = response
        this.tracksRandom = response
        console.log('Canciones Tracks Trending: ', response)
      }
    )

    const observer2$ = this._trackService.dataTracksRandom$.subscribe(
      (response) => {
        this.tracksRandom = [... this.tracksRandom, ... response]
        console.log('Canciones Tracks Random Entrando: ', response)
      }
    )

    this.listObservers$ = [observer1$, observer2$]*/
  }

  async loadDataAll(): Promise<any> {

    this.tracksTrending = await this._trackService.getAllTracks$().toPromise()
    this.tracksRandom = await this._trackService.getAllTracksRandom$().toPromise()

    /*this._trackService.getAllTracks$().subscribe(
      (response: TrackModel[]) => {
        this.tracksTrending = response
        console.log('TRACKS: ', response)
      }
    )*/
  }

  loadDataReverse(): void {
    this._trackService.getAllTracksRandom$().subscribe(
      (response: TrackModel[]) => {
        this.tracksRandom = response
        console.log('TRACKS: ', response)
      },err => { console.log('Error de conexion') }
    )
  }

  ngOnDestroy(): void {
    //this.listObservers$.forEach(subs => subs.unsubscribe())
  }

}
