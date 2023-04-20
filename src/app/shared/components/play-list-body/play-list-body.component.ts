import { Component, Input, OnInit } from '@angular/core';

//import * as dataRaw from '../../../data/tracks.json';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/service/track.service';

@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.css']
})
export class PlayListBodyComponent implements OnInit {

  @Input() tracks: Array<TrackModel> = []

  @Input() src: string = ''

  optionSort: {
    property:string | null, order: string
  } = { property: null, order: 'asc'}

  constructor(private _trackService:TrackService) {}

  ngOnInit(): void {
    /*const { data }:any = (dataRaw as any).default
    this.tracks = data*/
    console.log('INPUT TRACK ', this.tracks)
    this.loadDataAll()
  }

  async loadDataAll(): Promise<any> {
    this.tracks = await this._trackService.getAllTracks$().toPromise()
  }

  changeSort(property: string): void {
    const {order} = this.optionSort
    this.optionSort = {
      property:property,
      order:order == 'asc' ? 'desc' : 'asc'
    }
  }
}
