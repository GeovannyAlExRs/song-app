import { Component, OnInit } from '@angular/core';
import { UserInterface } from '@core/interfaces/user.interface';
import { AuthService } from '@modules/auth/service/auth.service';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.css']
})
export class CardUserComponent implements OnInit {

  user: UserInterface = {id: '', name: '', imageUrl: ''}

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.user = this._authService.user
  }

  logout() {
    console.log('CLIK EN LOGOUT');

    this._authService.logout()
  }
}
