import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArtistInterface } from '@core/interfaces/artist.interface';
import { TrackInterface } from '@core/interfaces/track.interface';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/service/track.service';
import { SpotifyService } from '@shared/services/spotify/spotify.service';
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

  topArtist: ArtistInterface[] = []
  tracksSmall: Array<TrackInterface> = []
  tracksBig: Array<TrackInterface> = []

  constructor(private _trackService:TrackService, private _spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.searchArtist()
    //this.loadDataAll()
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

  async searchArtist() {
    const artist = await this._spotifyService.searchTopArtist(1)
    if(!!artist) {
      this.topArtist = artist
    }
    //console.log('topArtist: ', this.topArtist);
    this.tracksSmall = await this._spotifyService.searchTrackSmall()
    //console.log('Tracks : ', this.tracksSmall);
    this.tracksBig = await this._spotifyService.searchTrackBig()
    //console.log('Tracks : ', this.tracksBig);
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
      }
    )
  }

  ngOnDestroy(): void {
    //this.listObservers$.forEach(subs => subs.unsubscribe())
  }
}
