import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  src: string = ''

  constructor() {}

  ngOnInit(): void {}

  callSearch(valor: string): void {
    if(valor.length >= 3) {
      console.log('VALOR: ',valor);
    }

  }
}
