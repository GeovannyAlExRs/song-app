import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy{

  //mockCover: TrackModel = { cover: '', album: '', name: '', url: '', _id: '' }
  mockCover!: TrackModel

  listObservers: Array<Subscription> = []

  constructor(public _multimediaService: MultimediaService) {}

  ngOnInit(): void {

    /*const observer1: Subscription = this._multimediaService.callback.subscribe(
      (response: TrackModel) => { console.log('Recibiendo cancion del cardPlayer: ', response) }
    )*/

    /*const observable1$ = this._multimediaService.myObservable1$.subscribe(
      (responseOk) => {
        console.log('El agua llega perfecto ', responseOk);

      },
      (responseFail) => {
        console.log('Se tapo la tuberia ', responseFail);
      }
    )*/

    this._multimediaService.tracksInfo$.subscribe(
      res => {
        console.log('DEBO REPRODUCIR ESTA CANCION... ', res);

      }
    )

    //this.listObservers = []
  }

  ngOnDestroy(): void {
    this.listObservers.forEach(susb => susb.unsubscribe())
    console.log('DESTRUYENDO TODO COMPONENTE HIJO')
  }
}
