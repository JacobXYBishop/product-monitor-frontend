import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {PositionModel} from './position.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

import {curDate, curTime} from '../utils';

@Injectable()
export class PositionService {

  constructor(private http: Http) {
  }

  public getPositionInfo(productSelection: string, typeSelection: string): Observable<PositionModel[]> {
    const url = `${environment.positionURL}/${typeSelection}/${productSelection}?date=${curDate()}`;
    return this.http.get(url).map(
      res => {
        const r = res.json();
        return r.map(pos => new PositionModel(pos));
      });
  }
}
