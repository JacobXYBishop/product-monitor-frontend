import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class BuildService {

  constructor(private http: Http) { }

  populateBuildQueue() {
    return this.http.get('http://192.168.51.210:3000/build').map(res => res.json());
  }
}
