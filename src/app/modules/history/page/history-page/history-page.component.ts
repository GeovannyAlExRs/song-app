import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit{

  constructor() {}

  ngOnInit(): void {}

  receiveData(event: string): void {
    console.log('Estoy desde el padre: ', event);

  }
}
