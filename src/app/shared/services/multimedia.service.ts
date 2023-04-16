import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any> = new EventEmitter<any>();

  public audio!: HTMLAudioElement
  public tracksInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)

  //myObservable1$: BehaviorSubject<any> = new BehaviorSubject('AGUA...!!!')
  // myObservable1$: Subject<any> = new Subject()
  // myObservable1$: Observable<any> = new Observable()

  constructor() {

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
}
