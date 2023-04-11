import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit{

  mockTrackList:Array<any> =[
    {name: "MUSICA 1"},
    {name: "MUSICA 2"},
    {name: "MUSICA 3"}
  ]

  constructor() {}

  ngOnInit(): void {}
}
