import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {environment} from '../../environments/environment';

@Injectable()
export class HeatmapService {

  constructor(private http: Http) {
  }

  public getData(dataName: string): Observable<any> {
    const url = `${environment.jsonServerURL}/${dataName}`;
    return this.http.get(url).map(
      res => {
        return res.json();
      });
  }

}
