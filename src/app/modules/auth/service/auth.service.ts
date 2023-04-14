import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL = environment.api

  constructor(private _httpClient: HttpClient, private cookie: CookieService) { }

  sendCredentials(email: string, password: string): Observable<any> {
    //console.log('Email: ', email, ' Password: ', password )
    const body = { email, password}

    return this._httpClient.post(`${this.URL}/auth/login`, body).pipe(
      tap((resquest: any) => {
        const { tokenSession, data} = resquest
        this.cookie.set('token_service', tokenSession, 2, '/')
      })
    )
  }
}
