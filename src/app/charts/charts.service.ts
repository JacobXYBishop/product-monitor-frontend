import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ChartsService {

  constructor(private http: Http) {
  }

  public getCandlestickData(): Observable<any> {
    // const url = 'http://localhost:3000/candlestick';
    const url = 'http://192.168.51.210:3000/candlestick';
    return this.http.get(url).map(
      res => {
        // console.log(res.json());
        return res.json();
      });
  }
  public getLineData(): Observable<any> {
    // const url = 'http://localhost:3000/line';
    const url = 'http://192.168.51.210:3000/line';
    return this.http.get(url).map(
      res => {
        // console.log(res.json());
        return res.json();
      });
  }
}
