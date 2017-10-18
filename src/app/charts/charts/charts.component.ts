import {Component} from '@angular/core';
import * as echarts from 'echarts';

import {ChartsService} from '../charts.service';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';


@Component({
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent {
  data;
  line;

  constructor(service: ChartsService) {

    const complete$ = Observable.forkJoin(
      service.getCandlestickData(),
      service.getLineData()
    ).map((d: any[]) => {
      this.data = d[0];
      this.line = d[1];
    });

    complete$.subscribe(() => { this.createCharts(); });

  }

  createCharts() {
    const myChart = echarts.init(document.getElementById('main') as HTMLDivElement);

    const rawData0 = this.data;
    const rawData1 = this.line;

    const dates = rawData0.map(function (item) {
      return item[0];
    });

    const data = rawData0.map(function (item) {
      return [+item[1], +item[2], +item[3], +item[4]];
    });

    const volume = rawData0.map(function (item) {
      return +item[5];
    });

    const tmpData = rawData1.map(function (item) {
      return [item[0], +item[1]];
    });


    const option = {
      backgroundColor: '#21202D',
      legend: {
        // data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30', '趋势线'],
        data: ['日K', '趋势线'],
        inactiveColor: '#777',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        backgroundColor: 'rgba(245, 245, 245, 0.8)',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textStyle: {
          color: '#000'
        },
        extraCssText: 'width: 170px'
      },
      xAxis: [
        {
          type: 'category',
          data: dates,
          axisLine: {lineStyle: {color: '#8392A5'}},
          scale: true,
          boundaryGap: false,
          // axisLine: {onZero: false},
          splitLine: {show: false},
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax',
        },
        {
          type: 'category',
          data: dates,
          axisLine: {lineStyle: {color: '#8392A5'}},
          axisLabel: {show: false},
          gridIndex: 1,
          boundaryGap: false,
          axisTick: {show: false},
          splitLine: {show: false},
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax',
        }
      ],
      yAxis: [
        {
          scale: true,
          axisLine: {lineStyle: {color: '#8392A5'}},
          splitLine: {show: false},
        },
        {
          scale: true,
          gridIndex: 1,
          splitNumber: 2,
          axisLabel: {show: false},
          axisLine: {show: false},
          axisTick: {show: false},
          splitLine: {show: false}
        }
      ],
      grid: [
        {
          left: '10%',
          right: '8%',
          height: '65%'
        },
        {
          left: '10%',
          right: '8%',
          top: '75%',
          height: '16%'
        }
      ],

      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          start: 80,
          end: 100
        },
        {
          show: true,
          xAxisIndex: [0, 1],
          type: 'slider',
          top: '95%',
          start: 80,
          end: 100
        }
      ],

      animation: false,

      series: [
        {
          type: 'candlestick',
          name: '日K',
          data: data,
          z: 50,
          itemStyle: {
            normal: {
              color: '#AA0028',
              color0: '#00A561',
              borderColor: '#AA0028',
              borderColor0: '#00A561'
            }
          },
          markArea: {
            silent: true,
            z: 90,
            itemStyle: {
              normal: {
                color: 'transparent',
                borderWidth: 1,
                borderColor: 'Honeydew'
              }
            },
            data: [
              [
                {coord: ['2017/10/09', 13]},
                {coord: ['2017/10/17', 15]}
              ],
              [
                {coord: ['2017/07/10', 11]},
                {coord: ['2017/07/26', 14]}
              ],
            ]
          },
          markPoint: {
            silent: true,
            z: 90,
            symbol: 'circle',
            // symbolSize: 3,
            itemStyle: {
              normal: {
                color: 'red',
              }
            },
            data: [
              {coord: ['2017/08/30', 15.5]},
              {coord: ['2017/07/18', 12.5]},
              // {type: 'max', name: 'max'},
              // {type: 'min', name: 'min'},
            ]
          }
        },
        // {
        //   type: 'line',
        //   name: 'MA5',
        //   data: this.calculateMA(5, data),
        //   smooth: true,
        //   showSymbol: false,
        //   lineStyle: {
        //     normal: {
        //       width: 1
        //     }
        //   }
        // },
        // {
        //   type: 'line',
        //   name: 'MA10',
        //   data: this.calculateMA(10, data),
        //   smooth: true,
        //   showSymbol: false,
        //   lineStyle: {
        //     normal: {
        //       width: 1
        //     }
        //   }
        // },
        // {
        //   type: 'line',
        //   name: 'MA20',
        //   data: this.calculateMA(20, data),
        //   smooth: true,
        //   showSymbol: false,
        //   lineStyle: {
        //     normal: {
        //       width: 1
        //     }
        //   }
        // },
        // {
        //   type: 'line',
        //   name: 'MA30',
        //   data: this.calculateMA(30, data),
        //   smooth: true,
        //   showSymbol: false,
        //   lineStyle: {
        //     normal: {
        //       width: 1
        //     }
        //   }
        // },
        {
          type: 'line',
          name: '趋势线',
          data: tmpData,
          z: 100,
          smooth: false,
          showSymbol: true,
          lineStyle: {
            normal: {
              color: 'white',
              width: 1,
            }
          },
        },
        {
          name: 'Volume',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: volume
        }
      ]
    };

    myChart.setOption(option);
  }

  // calculateMA(dayCount, data) {
  //   const result = [];
  //   for (let i = 0, len = data.length; i < len; i++) {
  //     if (i < dayCount) {
  //       result.push('-');
  //       continue;
  //     }
  //     let sum = 0;
  //     for (let j = 0; j < dayCount; j++) {
  //       sum += data[i - j][1];
  //     }
  //     result.push(sum / dayCount);
  //   }
  //   return result;
  // }


}
