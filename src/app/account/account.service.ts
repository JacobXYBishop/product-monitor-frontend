import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AccountModel} from './account.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

import {curDate} from '../utils';

@Injectable()
export class AccountService {

  constructor(private http: Http) {
  }

  public getAccountInfo(): Observable<AccountModel[]> {
    const url = `${environment.accountURL}?date=${curDate()}`;
    return this.http.get(url).map(
      res => {
        const r = res.json();
        return r.map(acct => new AccountModel(this.modelTransform(acct)));
      });
  }

  modelTransform(obj) {
    obj.stock_mv = (obj.stock_mv / 10000).toFixed(2);
    obj.future_mv = (obj.future_mv / 10000).toFixed(2);
    obj.future_mg = (obj.future_mg / 10000).toFixed(2);
    obj.stock_total_asset = (obj.stock_total_asset / 10000).toFixed(2);
    obj.future_total_asset = (obj.future_total_asset / 10000).toFixed(2);
    obj.account_total_asset = (obj.account_total_asset / 10000).toFixed(2);
    obj.exposure = (obj.exposure / 10000).toFixed(2);
    obj.trade_exposure = (obj.trade_exposure / 10000).toFixed(2);
    obj.trade_amount = (obj.trade_amount / 10000).toFixed(2);
    return obj;
  }
}
