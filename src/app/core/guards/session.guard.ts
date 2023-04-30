import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '@modules/auth/service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanLoad { //implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const token = localStorage.getItem('token')

      if(!token) {
        //console.log('TOKEN SESSION GUARDS', token);
        return this.failAuth()
      }

      return new Promise(async (res) => {
        const userSave = await this._authService.initizathionService()
        if(userSave) {
          res(true)
        } else {
          res(this.failAuth())
        }
      })
  }

  failAuth() {
    localStorage.clear()
    this._router.navigate(['/', 'auth'])
    return false
  }

  //constructor(private _cookieService: CookieService, private _router: Router) { }

  /*canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkCookieSession();
  }

  checkCookieSession(): boolean {
    try {

      const token: boolean = this._cookieService.check('token')
      console.log('OK OK OK ', token);

      if(!token){
        this._router.navigate(['/', 'auth'])
      } else {
        return token
      }

    } catch (error) {
      console.log('Ups! Algo salio mal... ', error);
      return false
    }
    return true
  }*/
}
