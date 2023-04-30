import { ArtistInterface } from "@core/interfaces/artist.interface";
import { PlayListInterface } from "@core/interfaces/play-list.interface";
import { TrackInterface } from "@core/interfaces/track.interface";

export function newArtist(): ArtistInterface {
  return {
    id: '',
    name: '',
    imageUrl: '',
    tracks: []
  }
}

export function newTrack(): TrackInterface {
  return {
    id: '',
    album: {id: '', imageUrl: '', name: '',},
    artist: [{id:'', name:'',}],
    duration: '',
    title: '',
  }
}

export function newPlaylist(): PlayListInterface {
  return {
    id: '',
    imageUrl: '',
    name: '',
    tracks: []
  }
}
