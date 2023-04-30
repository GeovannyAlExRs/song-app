import { TrackInterface } from "./track.interface"

export interface PlayListInterface {
  id: string,
  name: string
  imageUrl: string | undefined,
  tracks?: TrackInterface[]
}
