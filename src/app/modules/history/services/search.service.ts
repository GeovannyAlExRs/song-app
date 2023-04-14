import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly URL = environment.api

  constructor(private _httpClient: HttpClient) { }

  searchTracks$(search: string): Observable<any> {
    return this._httpClient.get(`${this.URL}/tracks?src=${search}`)
  }
}
