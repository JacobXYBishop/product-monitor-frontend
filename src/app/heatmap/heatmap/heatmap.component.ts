import {Component} from '@angular/core';
import {HeatmapService} from '../heatmap.service';

import * as echarts from 'echarts';

@Component({
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent {
  heatmapChart;

  hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
    '7a', '8a', '9a', '10a', '11a',
    '12p', '1p', '2p', '3p', '4p', '5p',
    '6p', '7p', '8p', '9p', '10p', '11p'];
  days = ['Saturday', 'Friday', 'Thursday',
    'Wednesday', 'Tuesday', 'Monday', 'Sunday'];

  option;
  heatmapData;


  constructor(service: HeatmapService) {

    service.getData('heatmap').subscribe(
      (res) => {
        this.heatmapData = res.map(
          item => [item[1], item[0], item[2] || '-']
        );
        this.createCharts();
      }
    );

  }

  createCharts() {
    this.heatmapChart = echarts.init(document.getElementById('heatmap') as HTMLDivElement);

    this.option = {
      tooltip: {
        position: 'top'
      },
      animation: false,
      grid: {
        height: '50%',
        y: '10%'
      },
      xAxis: {
        type: 'category',
        data: this.hours,
        splitArea: {
          show: true
        }
      },
      yAxis: {
        type: 'category',
        data: this.days,
        splitArea: {
          show: true
        }
      },
      visualMap: {
        min: 0,
        max: 10,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%'
      },
      series: [{
        name: 'Punch Card',
        type: 'heatmap',
        data: this.heatmapData,
        label: {
          normal: {
            show: true
          }
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };

    this.heatmapChart.setOption(this.option);
    this.heatmapChart.resize({height: `${document.body.clientHeight}px`});
  }
}
