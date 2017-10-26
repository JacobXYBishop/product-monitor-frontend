/**
 * Created by jacob on 10/18/2017.
 */
import * as echarts from 'echarts';

export function curDate() {
  const today = new Date();
  const dd = today.getDate();
  let d;
  const mm = today.getMonth() + 1;
  let m;
  const yyyy = today.getFullYear();
  d = dd < 10 ? '0' + String(dd) : String(dd);
  m = mm < 10 ? '0' + String(mm) : String(mm);
  return `${yyyy}${m}${d}`;
}

export function curTime() {
  const today = new Date();
  const hh = today.getHours();
  const mm = today.getMinutes();
  const ss = today.getSeconds();
  let h;
  let m;
  let s;
  h = hh < 10 ? '0' + String(hh) : String(hh);
  m = mm < 10 ? '0' + String(mm) : String(mm);
  s = ss < 10 ? '0' + String(ss) : String(ss);
  return `${h}${m}${s}`;
}

export function invokeSleep(timeInterval: Array<string>[] = [['092000', '113500'], ['125500', '150500']]) {
  const t = curTime();
  for (const obj of timeInterval) {
    if (obj[0] <= t && t <= obj[1]) {
      return true;
    }
  }
  return false;
}

export interface CandlestickDataModel {
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
  x: number | string;
}

export interface LineDataModel {
  y: number;
  x: number | string;
}

export interface RectangleDataModel {
  x1: number | string;
  y1: number;
  x2: number | string;
  y2: number;
}

export interface PointDataModel {
  y: number;
  x: number | string;
  label?: string;
}

export class CandlestickChart {
  private candlestickChart;
  private option = {
    backgroundColor: '#21202D',
    legend: {
      data: [],
      inactiveColor: '#777',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
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
    axisPointer: {
      link: {xAxisIndex: 'all'}
    },
    xAxis: [],
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
    grid: [],
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

    series: []
  };
  private xAxis: Array<number | string>;
  private volume: Array<number>;

  constructor(chartID: string) {
    this.candlestickChart = echarts.init(document.getElementById(chartID) as HTMLDivElement);
  }

  public setXAxis(gridIndex: number = 0,
                  label: boolean = true,
                  data = null) {
    let d;
    if (data === null) {
      d = this.xAxis;
    } else {
      d = data;
    }
    this.option.xAxis.push(
      {
        type: 'category',
        data: d,
        gridIndex: gridIndex,
        axisLine: {
          onZero: true,
          lineStyle: {color: '#8392A5'}
        },
        axisLabel: {show: label},
        scale: true,
        boundaryGap: false,
        axisTick: {show: false},
        splitLine: {show: false},
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax',
      }
    );
  }

  public setGrid(top: string,
                 height: string,
                 left: string = '10%',
                 right: string = '10%') {
    this.option.grid.push(
      {
        left: left,
        right: right,
        top: top,
        height: height
      }
    );
  }

  public addCandlestick(name: string,
                        data: Array<CandlestickDataModel>,
                        increaseBarColor: string = '#AA0028',
                        decreaseBarColor: string = '#00A561',
                        z: number = 10) {
    const d = this._convertCandlestickData(data);
    this.option.legend.data.push(name);
    this.option.series.push(
      {
        type: 'candlestick',
        name: name,
        data: d,
        z: z,
        itemStyle: {
          normal: {
            color: increaseBarColor,
            color0: decreaseBarColor,
            borderColor: increaseBarColor,
            borderColor0: decreaseBarColor
          }
        },
      },
    );
  }

  public addLine(name: string,
                 data: Array<LineDataModel>,
                 lineColor: string = 'white',
                 lineType: string = 'solid',
                 lineWidth: number = 1,
                 z: number = 60) {
    this.option.legend.data.push(name);
    const d = this._convertLineData(data);
    this.option.series.push(
      {
        type: 'line',
        name: name,
        data: d,
        z: z,
        smooth: false,
        showSymbol: true,
        lineStyle: {
          normal: {
            type: lineType,
            color: lineColor,
            width: lineWidth
          }
        }
      }
    );
  }

  public addVolume(name: string,
                   data: Array<CandlestickDataModel>) {
    const d = this._convertVolumeData(data);
    this.option.series.push(
      {
        type: 'bar',
        name: name,
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: d
      }
    );
  }

  public addRectangle(name: string,
                      data: Array<RectangleDataModel>,
                      borderColor: string = 'white',
                      borderWidth: number = 1,
                      innerColor: string = 'transparent',
                      z: number = 90) {
    const d = this._convertRectangleData(data);
    this.option.series.push(
      {
        type: 'line',
        name: name,
        markArea: {
          silent: true,
          z: z,
          itemStyle: {
            normal: {
              color: innerColor,
              borderColor: borderColor,
              borderWidth: borderWidth
            }
          },
          data: d
        },
      }
    );
  }

  public addPoint(name: string,
                  data: Array<PointDataModel>,
                  backgroundColor: string = 'red',
                  labelColor: string = 'white',
                  symbol: string = 'pin',
                  symbolSize: number = 50,
                  symbolOffset: Array<number | string> = [0, '10%']) {
    const d = this._convertPointData(data);
    const l = this._convertPointLabel(data);
    let f;
    if (d.length === 0) {
      f = null;
    } else {
      f = value => l[value.dataIndex];
    }

    this.option.series.push(
      {
        type: 'line',
        name: name,
        markPoint: {
          silent: true,
          z: 90,
          symbol: symbol,
          symbolSize: symbolSize,
          symbolOffset: symbolOffset,
          itemStyle: {
            normal: {
              color: backgroundColor,
            }
          },
          data: d,
          label: {
            normal: {
              color: labelColor,
              formatter: f
            }
          }
        }
      }
    );
  }

  public addMA(name: string,
               dayCount: number,
               data: Array<any>,
               opacity: number = .5) {
    const result = [];
    for (let i = 0, len = data.length; i < len; i++) {
      if (i < dayCount) {
        result.push('-');
        continue;
      }
      let sum = 0;
      for (let j = 0; j < dayCount; j++) {
        sum += data[i - j][1];
      }
      result.push(sum / dayCount);
    }

    this.option.legend.data.push(name);
    this.option.series.push(
      {
        type: 'line',
        name: name,
        data: result,
        smooth: true,
        lineStyle: {
          normal: {
            opacity: opacity
          }
        }
      }
    );
  }

  public complete() {
    if (this.option.xAxis.length === 0) {
      this.setXAxis(0, true);
      this.setXAxis(1, false);
    }

    if (this.option.grid.length === 0) {
      this.setGrid('10%', '65%');
      this.setGrid('79%', '15%');
    }

    this.candlestickChart.setOption(this.option);
    this.candlestickChart.resize({height: `${document.documentElement.clientHeight - 160}px`});
  }

  private _convertCandlestickData(data: Array<CandlestickDataModel>) {
    this.xAxis = data.map(item => item['x']);
    return data.map(item => [+item['open'], +item['close'], +item['low'], +item['high']]);
  }

  private _convertVolumeData(data: Array<CandlestickDataModel>) {
    return data.map(item => item['volume']);
  }

  private _convertLineData(data: Array<LineDataModel>) {
    return data.map(item => [item['x'], item['y']]);
  }

  private _convertRectangleData(data: Array<RectangleDataModel>) {
    return data.map(item => [{coord: [item['x1'], +item['y1']]}, {coord: [item['x2'], +item['y2']]}]);
  }

  private _convertPointData(data: Array<PointDataModel>) {
    return data.map(item => this._t([item['x'], +item['y']]));
  }

  private _convertPointLabel(data: Array<PointDataModel>) {
    return data.map(item => item['label']);
  }

  private _t(item) {return {coord: item}; }


}

