import { Component, OnInit } from '@angular/core';

import { TrackModel } from '@core/models/tracks.model';

import * as dataRaw from '../../../../data/tracks.json'
import { TrackService } from '@modules/tracks/service/track.service';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit{

  tracksTrending:Array<TrackModel> =[]
  tracksRandom:Array<TrackModel> =[]

  constructor(private _trackService:TrackService) {}

  ngOnInit(): void {
    /*const { data }:any = (dataRaw as any).default
    this.mockTrackList = data
    console.log(data)*/
    const observer1$ = this._trackService.dataTracksTrending$.subscribe(
      (response) => {
        console.log('Canciones Tracks Trending: ', response)
      }
    )
  }
}
