import { TrackInterface } from "./track.interface";

export interface ArtistInterface {
  id: string,
  name: string,
  imageUrl: string | undefined,
  tracks?: TrackInterface[]
}
