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
        return r.map(acct => new AccountModel(acct));
      });
  }
}
