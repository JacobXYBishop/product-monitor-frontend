import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/timer';

import * as echarts from 'echarts';


@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit {
  graphing = true;

  dynamicChart;
  option;
  movingStep = 30;
  interval$ = Observable.interval(2000);

  constructor() {
    setTimeout(() => this.graphing = false, 2000);
    this.interval$.subscribe(() => {
      this.startMoving();
    });
  }

  ngOnInit() {
    this.createCharts();
  }

  createCharts() {

    this.dynamicChart = echarts.init(document.getElementById('dynamic') as HTMLDivElement);

    this.option = {
      title: {
        text: '动态数据',
        subtext: '动态量价'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#283b56'
          }
        }
      },
      legend: {
        data: ['最新成交价', '成交量']
      },
      toolbox: {
        show: true,
        feature: {
          dataView: {readOnly: false},
          restore: {},
          saveAsImage: {}
        }
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: (() => {
            let now = new Date();
            const res = [];
            let len = 30;
            while (len--) {
              res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
              now = new Date(Number(now) - 2000);
            }
            return res;
          })()
        },
        {
          type: 'category',
          boundaryGap: true,
          data: (function () {
            const res = [];
            let len = 30;
            while (len--) {
              res.push(len + 1);
            }
            return res;
          })()
        }
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: '价格',
          max: 30,
          min: 0,
          boundaryGap: [0.2, 0.2]
        },
        {
          type: 'value',
          scale: true,
          name: '成交量',
          max: 1200,
          min: 0,
          boundaryGap: [0.2, 0.2]
        }
      ],
      series: [
        {
          name: '成交量',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: (function () {
            const res = [];
            let len = 30;
            while (len--) {
              res.push(Math.round(Math.random() * 1000));
            }
            return res;
          })()
        },
        {
          name: '最新成交价',
          type: 'line',
          data: (function () {
            const res = [];
            let len = 0;
            while (len < 30) {
              res.push(
                +(Math.random() * 10 + 5).toFixed(1)
              );
              len++;
            }
            return res;
          })()
        }
      ]
    };

    this.dynamicChart.resize({height: `${document.documentElement.clientHeight - 160}px`});
  }

  startMoving() {
    const axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

    const data0 = this.option.series[0].data;
    const data1 = this.option.series[1].data;

    data0.shift();
    data0.push(Math.round(Math.random() * 1000));
    data1.shift();
    data1.push(+(Math.random() * 10 + 5).toFixed(1));

    this.option.xAxis[0].data.shift();
    this.option.xAxis[0].data.push(axisData);
    this.option.xAxis[1].data.shift();
    this.option.xAxis[1].data.push(this.movingStep++);

    this.dynamicChart.setOption(this.option);
  }

}
