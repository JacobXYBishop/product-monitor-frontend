import {Component} from '@angular/core';
import {TreemapService} from '../treemap.service';

import * as echarts from 'echarts';


class Formatter {
  constructor() {}

  public addCommas(x) {
    if (isNaN(x)) {
      return '-';
    }
    x = (x + '').split('.');
    return x[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
      + (x.length > 1 ? ('.' + x[1]) : '');
  }

  public encodeHTML(source) {
    return String(source)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}


@Component({
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.css']
})
export class TreemapComponent {
  treemapChart;
  treemapData;

  option;

  modes = ['2012Budget', '2011Budget', 'Growth'];
  household_america_2012 = 113616229;
  formatUtil = new Formatter();

  constructor(service: TreemapService) {
    service.getData('treemap').subscribe(
      (res) => {
        this.treemapData = res;
        this.createCharts();
      }
    );
  }

  buildData(mode, originList) {
    const out = [];

    for (let i = 0; i < originList.length; i++) {
      const node = originList[i];
      const newNode = out[i] = this.cloneNodeInfo(node);
      const value = newNode.value;

      if (!newNode) {
        continue;
      }

      // Calculate amount per household.
      value[3] = value[0] / this.household_america_2012;

      // if mode === 0 and mode === 2 do nothing
      if (mode === 1) {
        // Set 'Change from 2010' to value[0].
        const tmp = value[1];
        value[1] = value[0];
        value[0] = tmp;
      }

      if (node.children) {
        newNode.children = this.buildData(mode, node.children);
      }
    }

    return out;
  }

  cloneNodeInfo(node) {
    if (!node) {
      return;
    }

    return {
      name: node.name,
      id: node.id,
      discretion: node.discretion,
      value: (node.value || []).slice(),
      children: null
    };
  }

  getLevelOption(mode) {
    return [
      {
        color: mode === 2
          ? [
            '#c23531', '#314656', '#61a0a8', '#dd8668',
            '#91c7ae', '#6e7074', '#61a0a8', '#bda29a',
            '#44525d', '#c4ccd3'
          ]
          : null,
        colorMappingBy: 'id',
        itemStyle: {
          normal: {
            borderWidth: 3,
            gapWidth: 3
          }
        }
      },
      {
        colorAlpha: mode === 2
          ? [0.5, 1] : null,
        itemStyle: {
          normal: {
            gapWidth: 1
          }
        }
      }
    ];
  }

  isValidNumber(num) {
    return num !== null && isFinite(num);
  }

  getTooltipFormatter(mode) {
    const amountIndex = mode === 1 ? 1 : 0;
    const amountIndex2011 = mode === 1 ? 0 : 1;

    return (info) => {
      const value = info.value;

      let amount = value[amountIndex];
      amount = this.isValidNumber(amount)
        ? this.formatUtil.addCommas(amount * 1000) + '$'
        : '-';

      let amount2011 = value[amountIndex2011];
      amount2011 = this.isValidNumber(amount2011)
        ? this.formatUtil.addCommas(amount2011 * 1000) + '$'
        : '-';

      let perHousehold = value[3];
      perHousehold = this.isValidNumber(perHousehold)
        ? this.formatUtil.addCommas((+perHousehold.toFixed(4)) * 1000) + '$'
        : '-';

      let change = value[2];
      change = this.isValidNumber(change)
        ? change.toFixed(2) + '%'
        : '-';

      return [
        '<div class="tooltip-title">' + this.formatUtil.encodeHTML(info.name) + '</div>',
        '2012 Amount: &nbsp;&nbsp;' + amount + '<br>',
        'Per Household: &nbsp;&nbsp;' + perHousehold + '<br>',
        '2011 Amount: &nbsp;&nbsp;' + amount2011 + '<br>',
        'Change From 2011: &nbsp;&nbsp;' + change
      ].join('');
    };
  }

  createSeriesCommon(mode) {
    return {
      type: 'treemap',
      name: null,
      top: null,
      visualDimension: null,
      data: null,
      tooltip: {
        formatter: this.getTooltipFormatter(mode)
      },
      label: {
        normal: {
          position: 'insideTopLeft',
          formatter: (params) => {
            const arr = [
              '{name|' + params.name + '}',
              '{hr|}',
              '{budget|$ ' + this.formatUtil.addCommas(params.value[0]) + '} {label|budget}'
            ];

            if (mode !== 1) {
              arr.push(
                '{household|$ ' + this.formatUtil.addCommas((+params.value[3].toFixed(4)) * 1000) + '} {label|per household}'
              );
            }

            return arr.join('\n');
          },
          rich: {
            budget: {
              fontSize: 22,
              lineHeight: 30,
              color: 'yellow'
            },
            household: {
              fontSize: 14,
              color: '#fff'
            },
            label: {
              fontSize: 9,
              backgroundColor: 'rgba(0,0,0,0.3)',
              color: '#fff',
              borderRadius: 2,
              padding: [2, 4],
              lineHeight: 25,
              align: 'right'
            },
            name: {
              fontSize: 12,
              color: '#fff'
            },
            hr: {
              width: '100%',
              borderColor: 'rgba(255,255,255,0.2)',
              borderWidth: 0.5,
              height: 0,
              lineHeight: 10
            }
          }
        }
      },
      itemStyle: {
        normal: {
          borderColor: 'black'
        }
      },
      levels: this.getLevelOption(0)
    };
  }

  createCharts() {
    this.treemapChart = echarts.init(document.getElementById('treemap') as HTMLDivElement);

    this.option = {
      title: {
        top: 5,
        left: 'center',
        text: 'How $3.7 Trillion is Spent',
        subtext: 'Obama’s 2012 Budget Proposal',
        backgroundColor: 'rgb(243,243,243)',
        borderRadius: [5, 5, 0, 0]
      },

      legend: {
        data: this.modes,
        selectedMode: 'single',
        top: 55,
        itemGap: 5,
        backgroundColor: 'rgb(243,243,243)',
        borderRadius: 5
      },

      tooltip: {},

      series: this.modes.map( (mode, idx) => {
        const seriesOpt = this.createSeriesCommon(idx);
        seriesOpt.name = mode;
        seriesOpt.top = 80;
        seriesOpt.visualDimension = idx === 2 ? 2 : null;
        seriesOpt.data = this.buildData(idx, this.treemapData);
        seriesOpt.levels = this.getLevelOption(idx);
        return seriesOpt;
      })
    };

    this.treemapChart.setOption(this.option);
    this.treemapChart.resize({height: `${document.body.clientHeight}px`});

  }


}
