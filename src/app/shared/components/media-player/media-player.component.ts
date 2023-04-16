import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  //mockCover!: TrackModel

  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('')

  listObservers: Array<Subscription> = []

  state: string = 'paused'

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

    const observable1$ = this._multimediaService.playerStatus$.subscribe(status => this.state = status)
    this.listObservers = [observable1$]
  }

  ngOnDestroy(): void {
    this.listObservers.forEach(susb => susb.unsubscribe())
    console.log('DESTRUYENDO TODO COMPONENTE HIJO')
  }

  handlePosition(event: MouseEvent): void {
    const elNative: HTMLElement = this.progressBar.nativeElement
    const { clientX } = event
    const { x, width } = elNative.getBoundingClientRect()
    const clicX = clientX - x
    const percentageFromX = (clicX * 100 ) / width
    //console.log(`Clic (X): [${clicX}], Width: [${width}], Width initial: [${x}], PercentageX: [${percentageFromX}]`)
    this._multimediaService.seekAudio(percentageFromX)

  }
}
