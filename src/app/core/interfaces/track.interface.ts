export interface TrackInterface {
  id: string,
  title: string,
  artist: {
    id: string,
    name: string
  }[],
  album: {
    id: string,
    name: string,
    imageUrl: string |undefined
  },
  duration: string,
  url?: string |undefined
}
