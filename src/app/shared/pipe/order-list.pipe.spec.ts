import { OrderListPipe } from './order-list.pipe';
import * as mockRaw from '../../data/tracks.json'
import { TrackModel } from '@core/models/tracks.model';

describe('OrderListPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderListPipe();
    expect(pipe).toBeTruthy();
  });

  it('Probando entrada y salida de valores', () => {
    const pipe = new OrderListPipe();
    const { data }: any = (mockRaw as any).default

    const result: TrackModel[] = pipe.transform(data)

    expect(result).toEqual(data)
  });

  it('Orden de forma ASC', () => {
    const pipe = new OrderListPipe();
    const { data }: any = (mockRaw as any).default
    const firstValue = data.find((i: any) => i._id ===1)
    const lastValue = data.find((i: any) => i._id ===8)

    const result: TrackModel[] = pipe.transform(data)
    const firstResult = result[0]
    const lastResult = result[result.length - 1]

    expect(firstResult).toEqual(firstValue)
    expect(lastResult).toEqual(lastValue)
  });
});
