export class AccountSchemaModel {
  product_name: string;
  stock_mv: number;
  future_mv: number;
  future_mg: number;
  stock_total_asset: number;
  future_total_asset: number;
  exposure: number;
  exposure_pct: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
