import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment, spotifyCongifuration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js'
import { UserInterface } from '@core/interfaces/user.interface';
import { SpotifyHelperByUser } from '@core/common/spotifyHelper.common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private readonly URL = environment.api

  private readonly URL_SPOTIFY = spotifyCongifuration.authEnpoint
  private readonly CLIENT_ID = spotifyCongifuration.clientId
  private readonly REDIRECT_URL = spotifyCongifuration.redirectUrl
  private readonly SCOPES = spotifyCongifuration.scopes

  spotifyApi!: Spotify.SpotifyWebApiJs
  user!: UserInterface

  //constructor(private _httpClient: HttpClient, private cookie: CookieService) { }

  /*sendCredentials(email: string, password: string): Observable<any> {
    //console.log('Email: ', email, ' Password: ', password )
    const body = { email, password}

    return this._httpClient.post(`${this.URL}/auth/login`, body).pipe(
      tap((resquest: any) => {
        const { tokenSession, data} = resquest
        this.cookie.set('token_service', tokenSession, 2, '/')
      })
    )
  }*/
  constructor(private _router: Router) {
    this.spotifyApi = new Spotify()
  }

  async initizathionService() {
    if(!!this.user){
      return true
    }
    const token = localStorage.getItem('token')

    if(!token){
      return false
    }
    try {
      this.accessTokenSpotify(token)
      await this.getUserSpotity()
      return !!this.user
    } catch (error) {
      return false
    }
  }

  async getUserSpotity() {
    const userInfo = await this.spotifyApi.getMe()
    this.user = SpotifyHelperByUser(userInfo)
    //console.log('USER INFO: ', this.user);
  }

  getUrlSpotify() {
    const authEndPoint = `${this.URL_SPOTIFY}?`
    const clientId = `client_id=${this.CLIENT_ID}&`
    const redirectUrl = `redirect_uri=${this.REDIRECT_URL}&`
    const scopes = `scope=${this.SCOPES.join('%20')}&`
    const responseType = `response_type=token&show_dialog=true`

    return authEndPoint + clientId + redirectUrl + scopes + responseType
  }

  getTokenUrlCallback() {
    //console.log('TOKEN: ', window.location.hash);
    if(!window.location.hash) {
      return ''
    }
    const params = window.location.hash.substring(1).split('&')

    return params[0].split('=')[1]
  }

  accessTokenSpotify(token: string) {
    this.spotifyApi.setAccessToken(token)
    localStorage.setItem('token', token)
  }

  logout() {
    localStorage.clear()
    this._router.navigate(['/auth/login'])
  }
}
