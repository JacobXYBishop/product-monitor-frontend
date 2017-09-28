export class PositionModel {
  product_id: string;
  ticker: string;
  volume: number;
  direction: string;
  date: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
