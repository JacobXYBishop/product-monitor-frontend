import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {environment as env} from '../../environments/environment';

@Injectable()
export class SummaryService {

  constructor(private http: Http) {
  }

  public getAccountSummary(productID: string, startDate: string, endDate: string): Observable<any[]> {
    // const url = `${env.summaryURL}/summary_${productID}?${env.summaryStart}=${startDate}&${env.summaryEnd}=${endDate}`;
    const url = `${env.summaryURL}/summary_${productID}`;
    return this.http.get(url).map(res => {
      return res.json();
    });
  }
}
