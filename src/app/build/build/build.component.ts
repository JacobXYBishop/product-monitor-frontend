import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/mapTo';


@Component({
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css'],
})
export class BuildComponent {
  clickHours$ = new Subject();
  clickDate$ = new Subject();
  clock;

  constructor() {
    this.clock = Observable.merge(
      this.clickHours$.mapTo('hour'),
      this.clickDate$.mapTo('day'),
      Observable.interval(1000).mapTo('second')
    )
      .startWith(Date())
      .scan((acc, curr) => {
        // so called reducers
        const date = new Date(acc);

        if (curr === 'second') {
          date.setSeconds(date.getSeconds() + 1);
        }

        if (curr === 'hour') {
          date.setHours(date.getHours() + 1);
        }

        if (curr === 'day') {
          date.setDate(date.getDate() + 1);
        }

        return date;
      });
  }
}
