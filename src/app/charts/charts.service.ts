import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {environment} from '../../environments/environment';

@Injectable()
export class ChartsService {

  constructor(private http: Http) {
  }

  public getData(dataName: string): Observable<any> {
    const url = `${environment.jsonServerURL}/${dataName}`;
    return this.http.get(url).map(
      res => {
        // console.log(res.json());
        return res.json();
      });
  }
}
