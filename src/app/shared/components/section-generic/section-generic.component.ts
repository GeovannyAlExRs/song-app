import { Component, Input, OnInit } from '@angular/core';
import { newTrack } from '@core/common/factories.common';
import { TrackInterface } from '@core/interfaces/track.interface';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-section-generic',
  templateUrl: './section-generic.component.html',
  styleUrls: ['./section-generic.component.css']
})
export class SectionGenericComponent implements OnInit {

  @Input() title: string = ''
  @Input() mode: 'small' | 'big' = 'big'
  @Input() dataTracks: Array<TrackModel> = []
  @Input() trackData: Array<TrackInterface> = []

  constructor() {}

  ngOnInit(): void {}

}
