import {Component} from '@angular/core';

import {TreemapService} from '../../treemap.service';

import * as echarts from 'echarts';

@Component({
  selector: 'app-inner-treemap',
  templateUrl: './inner-treemap.component.html',
  styleUrls: ['./inner-treemap.component.css']
})
export class InnerTreemapComponent {
  graphing = true;

  treemapChart;
  treemapData: any = [];

  option;

  constructor(service: TreemapService) {
    service.getData('treemap2').subscribe(
      res => {
        this.convertData(res, this.treemapData, '');
        this.createChart();
      }
    );
  }

  convertData(source, target, basePath) {
    for (const key of Object.keys(source)) {
      const path = basePath ? (basePath + '.' + key) : key;
      if (key.match(/^\$/)) {

      } else {
        target.children = target.children || [];
        const child = {name: path};
        target.children.push(child);
        this.convertData(source[key], child, path);
      }
    }

    if (!target.children) {
      target.value = source.$count || 1;
    } else {
      target.children.push({
        name: basePath,
        value: source.$count
      });
    }
  }

  createChart() {
    this.treemapChart = echarts.init(document.getElementById('inner-treemap') as HTMLDivElement);

    this.option = {
      title: {
        text: '配置项查询分布',
        subtext: '2016/04',
        left: 'leafDepth'
      },
      tooltip: {},
      series: [{
        name: 'option',
        type: 'treemap',
        visibleMin: 300,
        data: this.treemapData.children,
        leafDepth: 2,
        levels: [
          {
            itemStyle: {
              normal: {
                borderColor: '#555',
                borderWidth: 4,
                gapWidth: 4
              }
            }
          },
          {
            colorSaturation: [0.3, 0.6],
            itemStyle: {
              normal: {
                borderColorSaturation: 0.7,
                gapWidth: 2,
                borderWidth: 2
              }
            }
          },
          {
            colorSaturation: [0.3, 0.5],
            itemStyle: {
              normal: {
                borderColorSaturation: 0.6,
                gapWidth: 1
              }
            }
          },
          {
            colorSaturation: [0.3, 0.5]
          }
        ]
      }]
    };

    this.treemapChart.setOption(this.option);
    this.treemapChart.resize({height: `${document.documentElement.clientHeight - 180}px`});
    this.graphing = false;
  }

}
