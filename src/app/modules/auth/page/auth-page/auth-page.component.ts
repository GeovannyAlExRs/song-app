import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit{

  formLogin: FormGroup = new FormGroup({})

  constructor() {}

  ngOnInit(): void {
    this.formLogin = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16) ])
      }
    )
  }

  sendLogin(): void{
    const body = this.formLogin.value
    console.log('DATA: ', body)
  }
}
