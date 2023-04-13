import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/service/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit{

  errorSession: boolean = false

  formLogin: FormGroup = new FormGroup({})

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16) ])
      }
    )
  }

  sendLogin(): void{
    const { email, password } = this.formLogin.value
    this._authService.sendCredentials(email, password).subscribe(
      resquest => {
        console.info(' SESION INICIADA CORRECTAMENTE')
      }, err => {
        this.errorSession = true
        setTimeout(() => {this.errorSession = false}, 5000)
        console.warn(' ERROR AL INICIAR SESION')
      }
    )
  }
}
