import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';


@Component({
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css'],
})
export class BuildComponent {
  click$ = new Subject();
  clock;

  constructor() {
    this.clock = Observable.merge(
      this.click$,
      Observable.interval(5000)
    ).map(() => new Date());
  }
}
