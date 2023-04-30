import { Component, Input, OnInit } from '@angular/core';
import { newTrack } from '@core/common/factories.common';
import { TrackInterface } from '@core/interfaces/track.interface';
import { TrackModel } from '@core/models/tracks.model';
import { AuthService } from '@modules/auth/service/auth.service';
import { MultimediaService } from '@shared/services/multimedia.service';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.css']
})
export class CardPlayerComponent implements OnInit{

  @Input() mode: 'small' | 'big' = 'small'
  @Input() track: TrackModel = { _id: 0, name: '', album: '', url: '', cover: '' };
  @Input() track2: TrackInterface = newTrack()

  constructor(private _multimediaService: MultimediaService, private _authService: AuthService) {}

  ngOnInit(): void {}

  /*** [ SEND TRACK THE REPRODUCTOR ] ***/
  /*sendPlay(track2: TrackInterface): void {
    console.log('Enviando cancion al reproductor: ', track2)
    // this._multimediaService.callback.emit(track)
    this._multimediaService.tracksInfo$.next(track2)
  }*/

  async sendPlay(track2: TrackInterface) {
    console.log('Enviando cancion al reproductor: ', track2)
    //await this._authService.executeTrack(track2.id)
    this._multimediaService.tracksInfo$.next(track2)
  }
}
