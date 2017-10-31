import {Component} from '@angular/core';
import {HeatmapService} from '../heatmap.service';

import * as echarts from 'echarts';

@Component({
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent {
  graphing = true;

  heatmapChart;

  date = [
    '2017/09/19', '2017/09/20', '2017/09/21', '2017/09/22', '2017/09/25', '2017/09/26',
    '2017/09/27', '2017/09/28', '2017/09/29', '2017/10/09', '2017/10/10', '2017/10/11',
    '2017/10/12', '2017/10/13', '2017/10/16', '2017/10/17', '2017/10/18', '2017/10/19',
    '2017/10/20', '2017/10/23', '2017/10/24', '2017/10/25', '2017/10/26', '2017/10/27'
  ];
  product_name = [
    '慧睿1号',
    '慧睿2号',
    '梧桐',
    '华山',
    '慧睿',
    '泰山',
    '合伙',
    '博古通今',
    '汇富'
  ];

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
        top: 30,
        height: '70%',
        y: '10%'
      },
      xAxis: {
        type: 'category',
        data: this.date,
        splitArea: {
          show: true
        }
      },
      yAxis: {
        type: 'category',
        data: this.product_name.reverse(),
        splitArea: {
          show: true
        }
      },
      visualMap: {
        min: 0,
        max: 10,
        itemHeight: 700,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '10%',
        inRange: {
          color: ['#2ebabd', '#4e9da9', '#be3964', '#ee0e47']
        },
      },
      series: [{
        name: '产品收益情况',
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
    this.heatmapChart.resize({height: `${document.documentElement.clientHeight - 120}px`});
    this.graphing = false;
  }
}
