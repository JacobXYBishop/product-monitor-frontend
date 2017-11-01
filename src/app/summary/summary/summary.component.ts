import {Component, OnInit} from '@angular/core';
import {SummaryService} from '../summary.service';

import * as echarts from 'echarts';

import {dateFilter, dateFormatter} from '../../utils';
import {getProductInfo} from '../calculation';


const Products = [
  {product_id: 'yflh1', viewValue: '量化1号'},
  {product_id: 'yfwt', viewValue: '梧桐'},
  {product_id: 'gjhr1', viewValue: '慧睿1号'},
  {product_id: 'gjhr2', viewValue: '慧睿2号'},
  {product_id: 'yfhr', viewValue: '慧睿'},
  {product_id: 'yfhs', viewValue: '华山'},
  {product_id: 'yfts', viewValue: '泰山'},
  {product_id: 'yflp1', viewValue: '合伙'},
  {product_id: 'bgtj', viewValue: '搏股通金'},
  {product_id: 'hfyf', viewValue: '汇富'},
  {product_id: 'lhyx', viewValue: '量化优选'},
];

interface ProductInfoModel {
  netValueIncreasingRatio: number;
  netValueVolatilityRatio: number;
  sharpRatio: number;
  sortinoRatio: number;
  calmarRatio: number;
  investmentSuccessfulRatio: number;
  maxDrawdown: number;
  underHalfSTD: number;
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  graphing = false;
  calculated = false;

  myFilter = dateFilter;
  startDate;
  endDate;
  selectedProduct;
  products = Products;
  productInfo: ProductInfoModel;

  x;
  y;
  chart;
  option;

  constructor(public service: SummaryService) {
  }

  ngOnInit() {
    this.chart = echarts.init(document.getElementById('summary') as HTMLDivElement);
  }


  submit() {
    this.graphing = true;
    this.service.getAccountSummary(
      this.selectedProduct,
      dateFormatter(this.startDate),
      dateFormatter(this.endDate)
    ).subscribe(res => {
      this.x = res.map(item => item[0]);
      this.y = res.map(item => item[1]);
      this.createCharts();
      this.productInfo = getProductInfo(this.x, this.y);
      this.calculated = true;
    });

  }

  createCharts() {
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
        data: this.x
      },
      yAxis: {
        type: 'value',
        min: Math.floor(Math.min(...this.y) * 100 - 1) / 100
      },
      series: [{
        name: '产品收益情况',
        type: 'line',
        data: this.y,
        label: {
          normal: {
            show: true
          }
        },
      }]
    };

    this.chart.setOption(this.option);
    this.chart.resize({height: `${document.documentElement.clientHeight - 240}px`});
    this.graphing = false;
  }

}
