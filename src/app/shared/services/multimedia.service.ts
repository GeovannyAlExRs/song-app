import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Observable, Subject, observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any> = new EventEmitter<any>();

  public audio!: HTMLAudioElement
  public tracksInfo$: BehaviorSubject<any>   = new BehaviorSubject(undefined)
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00')
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00')
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused')

  //myObservable1$: BehaviorSubject<any> = new BehaviorSubject('AGUA...!!!')
  // myObservable1$: Subject<any> = new Subject()
  // myObservable1$: Observable<any> = new Observable()

  constructor() {

    this.audio = new Audio()

    this.tracksInfo$.subscribe(
      responseOK => {
        if(responseOK) {
          this.setAudio(responseOK)
        }

      }
    )

    this.listenAllEvents()

    //*** BEHAVIORSUBJECT ES IGUAL AL SUBJECT CON LA PARTICULARIDAD
    //*** DE QUE SU VALOR DEBE SER INICIALIZADO
    // setTimeout(() => { this.myObservable1$.next('AGUA...!!!'), 1000})

    //*** SUBJECT ES UN OBSERVABLE Y OBSERVER A LA VEZ, PERO NO SE SUSCRIBE
    //*** PORQUE PRIMERO LLAMA A SU SUSCRIPTOR, TRUCO -> PONER UN setTimeout()
    //setTimeout(() => { this.myObservable1$.next('AGUA...!!!'), 1000})

    //*** OBSERVER DENTRO DE UN OBSERVABLE PARA SUSCRIPTOR
    /*this.observable1$ = new Observable(
      (observer: Observer<any>) => {
        observer.next('AGUA...!!!'),
        setTimeout(() => { observer.complete(), 1000})
        setTimeout(() => { observer.next('AGUA...!!!'), 2500})
        setTimeout(() => { observer.error('UPS...!!!'), 3500})
      })*/
  }

  private listenAllEvents(): void {
    this.audio.addEventListener('timeupdate', this.calculateTime, false)
    this.audio.addEventListener('playing', this.setPlayerStatus, false)
    this.audio.addEventListener('play', this.setPlayerStatus, false)
    this.audio.addEventListener('pause', this.setPlayerStatus, false)
    this.audio.addEventListener('ended', this.setPlayerStatus, false)
  }

  private setPlayerStatus = (state: any) => {
    console.log('Evento... ', state);
    switch(state.type) {
      case 'play':
        this.playerStatus$.next('play')
        break
      case 'playing':
        this.playerStatus$.next('playing')
        break
      case 'ended':
        this.playerStatus$.next('ended')
        break
      default:
        this.playerStatus$.next('paused')
        break
    }
  }

  public togglePlayer(): void {
    (this.audio.paused) ? this.audio.play() : this.audio.pause()
  }

  private calculateTime = () => {
    console.log(' Disparando event ');
    const { duration, currentTime } = this.audio
    //console.table([duration, currentTime])
    this.setTimeElapsed(currentTime)
    this.setTimeRemaining(duration, currentTime)
  }

  private setTimeElapsed(currentTime: number): void {
    let seconds = Math.floor(currentTime % 60)
    let minutes = Math.floor((currentTime / 60) % 60)

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes
    const displayFormat = `${displayMinutes}:${displaySeconds}`

    this.timeElapsed$.next(displayFormat)
  }

  private setTimeRemaining(duration: number, currentTime: number): void {
    let timeLeft = duration - currentTime

    let seconds = Math.floor(timeLeft % 60)
    let minutes = Math.floor((timeLeft / 60) % 60)

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes
    const displayFormat = `-${displayMinutes}:${displaySeconds}`

    this.timeRemaining$.next(displayFormat)
  }

  public setAudio(track: TrackModel): void {
    console.log('RECIBIENDO TRACKS: ', track);
    this.audio.src = track.url
    this.audio.play()
  }
}
