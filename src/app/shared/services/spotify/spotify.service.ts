import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyHelperByPlayList, SpotifyHelperBySinglePlaylist, SpotifyHelperByTopArtist, SpotifyHelperByTrack, SpotifyHelperByUser } from '@core/common/spotifyHelper.common';
import { ArtistInterface } from '@core/interfaces/artist.interface';
import { PlayListInterface } from '@core/interfaces/play-list.interface';
import { TrackInterface } from '@core/interfaces/track.interface';
import { UserInterface } from '@core/interfaces/user.interface';
import { Observable, map, tap } from 'rxjs';
import Spotify from 'spotify-web-api-js'

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi!: Spotify.SpotifyWebApiJs
  //user!: UserInterface

  constructor() {
    this.spotifyApi = new Spotify()
  }

  async searchPlayListUser(offset = 0, limit = 20, user: UserInterface): Promise<PlayListInterface[]> {
    const playList = await this.spotifyApi.getUserPlaylists(user.id, { offset, limit})
    console.log('Play List: ', playList);

    return playList.items.map(SpotifyHelperByPlayList)
  }

  async searchTopArtist(limit = 10): Promise<ArtistInterface[]> {
    const artists = await this.spotifyApi.getMyTopArtists({limit})
    console.log('TOP Artist: ', artists);
    //artists.items.map(SpotifyHelperByTopArtist)
    return artists.items.map(SpotifyHelperByTopArtist)
  }

  async searchTrackSmall(offset=0, limit=10): Promise<TrackInterface[]>{
    const tracks = await this.spotifyApi.getMySavedTracks({ offset, limit });

    return tracks.items.map(x => SpotifyHelperByTrack(x.track));
  }

  async searchTrackBig(offset=0, limit=50): Promise<TrackInterface[]>{
    const tracks = await this.spotifyApi.getMySavedTracks({ offset, limit });
    console.log('searchTrackBig: ',tracks);

    return tracks.items.map(x => SpotifyHelperByTrack(x.track));
  }

  async searchTrackPlaylist(playlistId: string, offset = 0, limit = 50){
    const playlistSpotify = await this.spotifyApi.getPlaylist(playlistId);

    if (!playlistSpotify)
      return null;

    const playlist = SpotifyHelperBySinglePlaylist(playlistSpotify);

    const trackSpotify = await this.spotifyApi.getPlaylistTracks(playlistId, { offset, limit });
    playlist.tracks = trackSpotify.items.map(t => SpotifyHelperByTrack(t.track as SpotifyApi.TrackObjectFull))

    console.log('Tracks PlayList : ', playlist);
    return playlist;
  }

  async executeTrack(trackId: string){
    await this.spotifyApi.queue(trackId);
    await this.spotifyApi.skipToNext();
  }
}
