import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit {

  mockCover: TrackModel = {
    cover: '',
    album: '',
    name: '',
    url: '',
    _id: ''
  }

  constructor(private _multimediaService: MultimediaService) {}

  ngOnInit(): void {
    const observer1: Subscription = this._multimediaService.callback.subscribe(
      (response: TrackModel) => { console.log('Recibiendo cancion del cardPlayer: ', response) }
    )

  }

}
