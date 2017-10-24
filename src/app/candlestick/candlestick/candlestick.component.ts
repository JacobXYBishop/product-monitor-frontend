import {Component} from '@angular/core';
import {CandlestickService} from '../candlestick.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import {CandlestickChart} from '../../utils';

@Component({
  templateUrl: './candlestick.component.html',
  styleUrls: ['./candlestick.component.css'],
})
export class CandlestickComponent {
  candlestickData;
  line1Data;
  line2Data;
  line3Data;
  rec1Data;
  rec2Data;
  point1Data;
  point2Data;

  constructor(service: CandlestickService) {

    const complete$ = Observable.forkJoin(
      service.getData('candlestick'),
      service.getData('line1'),
      service.getData('line2'),
      service.getData('line3'),
      service.getData('rec1'),
      service.getData('rec2'),
      service.getData('point1'),
      service.getData('point2'),
    ).map((d: any[]) => {
      this.candlestickData = d[0];
      this.line1Data = d[1];
      this.line2Data = d[2];
      this.line3Data = d[3];
      this.rec1Data = d[4];
      this.rec2Data = d[5];
      this.point1Data = d[6];
      this.point2Data = d[7];
    });

    complete$.subscribe(() => this.createCharts());

  }

  createCharts() {
    const chart = new CandlestickChart('main');

    const complete$ = Observable.of(
      [
        chart.addCandlestick('日K', this.candlestickData),
        chart.addVolume('量', this.candlestickData),
        chart.addLine('趋势1', this.line1Data, 'beige'),
        chart.addLine('趋势2', this.line2Data, 'cyan'),
        chart.addLine('趋势3', this.line3Data, 'magenta'),
        chart.addRectangle('框1', this.rec1Data, 'Tomato'),
        chart.addRectangle('框2', this.rec2Data, 'Violet'),
        chart.addPoint('点1', this.point1Data, 'moccasin', 'black'),
        chart.addPoint('点2', this.point2Data, 'aqua', 'black', 'arrow')
      ]
    );

    complete$.subscribe(() => chart.complete());

  }
}
