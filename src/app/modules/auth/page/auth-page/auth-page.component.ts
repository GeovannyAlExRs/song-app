import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/service/auth.service';

import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit{

  errorSession: boolean = false

  formLogin: FormGroup = new FormGroup({})

  constructor(private _router: Router, private _authService: AuthService) {}
  //constructor(private _authService: AuthService, private cookie: CookieService, private _router: Router) {}

  ngOnInit(): void {
    /*this.formLogin = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16) ])
      })*/

    this.checkTokenUrlCallback()
  }

  sendLogin(): void{
    const { email, password } = this.formLogin.value
    /*this._authService.sendCredentials(email, password).subscribe(
      resquest => {
        console.info(' SESION INICIADA CORRECTAMENTE')
        const { tokenSession, data } = resquest
        this.cookie.set('token', tokenSession, 2, '/')
        this._router.navigate(['/', 'tracks'])
      }, err => {
        this.errorSession = true
        setTimeout(() => {this.errorSession = false}, 5000)
        console.warn(' ERROR AL INICIAR SESION')
      }
    )*/
  }

  checkTokenUrlCallback() {
    const token = this._authService.getTokenUrlCallback()
    //console.log('TOKEN AUTH PAGE: ', token);
    if(!!token) {
      this._authService.accessTokenSpotify(token)
      this._router.navigate(['/track']);
    }
  }

  clickSpotify() {
    window.location.href = this._authService.getUrlSpotify()
  }
}
