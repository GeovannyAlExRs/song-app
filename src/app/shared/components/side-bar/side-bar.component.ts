import { Component, OnInit } from '@angular/core';
import { PlayListInterface } from '@core/interfaces/play-list.interface';
import { UserInterface } from '@core/interfaces/user.interface';
import { AuthService } from '@modules/auth/service/auth.service';
import { SpotifyService } from '@shared/services/spotify/spotify.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit{

  mainMenu: {
    defaultOptions: Array<any>, accessLink: Array<any>
  } = { defaultOptions: [], accessLink: [] }

  customOptions: Array<any> = []
  user: UserInterface = {id: '', name: '', imageUrl: ''}
  playlists: PlayListInterface[] = []

  constructor(private _authService: AuthService, private _spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.mainMenu.defaultOptions = [
      {
        name: 'Home',
        icon: 'uil uil-estate',
        router: ['/']
      },
      {
        name: 'Buscar',
        icon: 'uil uil-search',
        router: ['/', 'history']
      },
      {
        name: 'Tu biblioteca',
        icon: 'uil uil-chart',
        router: ['/', 'favorites'],
        query: { hola: 'mundo' }
      }
    ]

    this.mainMenu.accessLink = [
      {
        name: 'Crear lista',
        icon: 'uil-plus-square'
      },
      {
        name: 'Canciones que te gustan',
        icon: 'uil-heart-medical'
      }
    ]

    this.customOptions = [
      {
        name: 'Mi lista º1',
        router: ['/']
      },
      {
        name: 'Mi lista º2',
        router: ['/']
      },
      {
        name: 'Mi lista º3',
        router: ['/']
      },
      {
        name: 'Mi lista º4',
        router: ['/']
      }
    ]
    this.user = this._authService.user
    this.searchPlayList()
  }

  async searchPlayList() {
    this.playlists = await this._spotifyService.searchPlayListUser(0 , 20, this.user)
  }
}
