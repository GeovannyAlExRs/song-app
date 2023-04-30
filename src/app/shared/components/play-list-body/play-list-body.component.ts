import { Component, Input, OnInit } from '@angular/core';
import { TrackInterface } from '@core/interfaces/track.interface';

//import * as dataRaw from '../../../data/tracks.json';
import { TrackModel } from '@core/models/tracks.model';
import { AuthService } from '@modules/auth/service/auth.service';
import { TrackService } from '@modules/tracks/service/track.service';
import { MultimediaService } from '@shared/services/multimedia.service';
import { SpotifyService } from '@shared/services/spotify/spotify.service';

@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.css']
})
export class PlayListBodyComponent implements OnInit {

  @Input() tracks: Array<TrackModel> = []
  @Input() track2: Array<TrackInterface> = []

  @Input() src: string = ''

  optionSort: {
    property:string | null, order: string
  } = { property: null, order: 'asc'}

  //constructor(private _trackService:TrackService, private _authService: AuthService, private _multimediaService: MultimediaService) {}
  constructor(private _spotifyService: SpotifyService, private _multimediaService: MultimediaService) {}

  ngOnInit(): void {
    /*const { data }:any = (dataRaw as any).default
    this.tracks = data*/
    console.log('INPUT TRACK ', this.tracks)
    this.loadDataAll()
  }

  async loadDataAll(): Promise<any> {
    //this.tracks = await this._trackService.getAllTracks$().toPromise()
    this.track2 = await this._spotifyService.searchTrackBig()
    //console.log('Play List Tracks: ', this.track2);
  }

  changeSort(property: string): void {
    const {order} = this.optionSort
    this.optionSort = {
      property:property,
      order:order == 'asc' ? 'desc' : 'asc'
    }
  }

  sendTrackPlay(track2: TrackInterface): void {
    //console.log('Enviando cancion al reproductor: ', track2)
    // this._multimediaService.callback.emit(track)
    this._multimediaService.tracksInfo$.next(track2)
  }
}
