import { Component, OnInit } from '@angular/core';
import { TrackInterface } from '@core/interfaces/track.interface';
import { UserInterface } from '@core/interfaces/user.interface';
import { AuthService } from '@modules/auth/service/auth.service';
import { SpotifyService } from '@shared/services/spotify/spotify.service';

@Component({
  selector: 'app-play-list-header',
  templateUrl: './play-list-header.component.html',
  styleUrls: ['./play-list-header.component.css']
})
export class PlayListHeaderComponent implements OnInit{

  user: UserInterface = {id: '', name: '', imageUrl: ''}
  tracks: Array<TrackInterface> = []

  constructor(private _authService: AuthService, private _spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.user = this._authService.user
    this.trackLikes()
  }
  async trackLikes() {
    this.tracks = await this._spotifyService.searchTrackBig()
  }
}
