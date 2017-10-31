export class SummaryModel {
  date: string;
  value: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}


export interface ListSummaryModel {
  product_id: string;
  value: SummaryModel[];
}

