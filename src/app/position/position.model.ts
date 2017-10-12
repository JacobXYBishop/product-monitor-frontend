export class PositionModel {
  product_id: string;
  ticker: string;
  volume: string;
  direction: string;
  date: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
