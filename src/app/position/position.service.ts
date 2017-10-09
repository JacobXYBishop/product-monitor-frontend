import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {PositionModel} from './position.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PositionService {

  constructor(private http: Http) {
  }

  public getPositionInfo(product_selection: string, type_selection: string): Observable<PositionModel[]> {
    const url = `http://192.168.51.198:5000/api/v1/position/${type_selection}/${product_selection}/${this.curDate()}`;
    return this.http.get(url).map(
      res => {
        const r = res.json();
        return r.map(pos => new PositionModel(pos));
      });
  }

  curDate() {
    const today = new Date();
    const dd = today.getDate();
    let d;
    const mm = today.getMonth() + 1;
    let m;
    const yyyy = today.getFullYear();

    if (dd < 10) {
      d = '0' + String(dd);
    } else {
      d = String(dd);
    }

    if (mm < 10) {
      m = '0' + String(mm);
    } else {
      m = String(mm);
    }

    return `${yyyy}${m}${d}`;
  }

}
