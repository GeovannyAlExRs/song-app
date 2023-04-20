import { Pipe, PipeTransform } from '@angular/core';
//import { TrackModel } from '@core/models/tracks.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any  {
    if(!value) return null
    if(!args) return value

    args = args.toLowerCase()
    console.log('VALUE: ', value, ' ARGS: ', args);


    return value.filter((track: any) => {
      return JSON.stringify(track.name).toLowerCase().includes(args) || JSON.stringify(track.album).toLowerCase().includes(args) || JSON.stringify(track.artist.name).toLowerCase().includes(args)
    })
  }

}
