import { ArtistInterface } from "@core/interfaces/artist.interface";
import { PlayListInterface } from "@core/interfaces/play-list.interface";
import { TrackInterface } from "@core/interfaces/track.interface";
import { UserInterface } from "@core/interfaces/user.interface";
import { newPlaylist, newTrack } from "./factories.common";

import { addMilliseconds, format } from "date-fns"; // CMD: DIGITA -> nmp i date-fns

export function SpotifyHelperByUser(user: SpotifyApi.CurrentUsersProfileResponse): UserInterface {
  return {
    id: user.id,
    name: user.display_name,
    imageUrl: user.images?.pop()?.url
  }
}

export function SpotifyHelperByPlayList(playlist: SpotifyApi.PlaylistObjectSimplified): PlayListInterface {
  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images?.pop()?.url
  }
}

export function SpotifyHelperByTopArtist(topArtist: SpotifyApi.ArtistObjectFull): ArtistInterface {
  return {
    id: topArtist.id,
    name: topArtist.name,
    imageUrl: topArtist.images?.pop()?.url
  }
}

export function SpotifyHelperBySinglePlaylist(playlist: SpotifyApi.SinglePlaylistResponse ): PlayListInterface {
  if (!playlist)
    return newPlaylist();

  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images?.shift()?.url,
  }

}

export function SpotifyHelperByTrack(spotifyTrack: SpotifyApi.TrackObjectFull) : TrackInterface{

  if (!spotifyTrack)
    return newTrack();

  const minutes = (ms: number) => {
    // CONVERT NUMBER A MINUTOS Y SEGUNDOS 00:00
    /*let seconds = Math.floor((ms / 1000) % 60)
    let minutes = Math.floor((ms / 1000 / 60) % 60)

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes
    const displayFormat = `${displayMinutes}:${displaySeconds}`*/
    //return displayFormat
    const data = addMilliseconds(new Date(0), ms);
    return format(data, 'mm:ss');
  }

  return {
    id: spotifyTrack.uri,
    title: spotifyTrack.name,
    album: {
      id: spotifyTrack.id,
      imageUrl: spotifyTrack.album.images?.shift()?.url,
      name: spotifyTrack.album.name
    },
    artist: spotifyTrack.artists.map(a => ({
      id: a.id,
      name: a.name
    })),
    duration: minutes(spotifyTrack.duration_ms),
    url: spotifyTrack.preview_url
  }
}
