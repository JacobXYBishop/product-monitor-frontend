export class AccountModel {
  product_name: string;
  stock_mv: string;
  future_mv: string;
  future_mg: string;
  stock_total_asset: string;
  future_total_asset: string;
  account_total_asset: string;
  account_position_pct: string;
  future_risk_pct: string;
  exposure: string;
  exposure_pct: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
