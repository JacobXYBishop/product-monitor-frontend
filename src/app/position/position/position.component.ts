import {Component} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {PositionService} from '../position.service';
import {PositionModel} from '../position.model';


const Products = [
  {product_id: 'gjhr1', viewValue: '国金慧睿1号'},
  {product_id: 'gjhr2', viewValue: '国金慧睿2号'},
  {product_id: 'yfwt', viewValue: '梧桐'},
  {product_id: 'yfhs', viewValue: '华山'},
  {product_id: 'yfhr', viewValue: '慧睿'},
  {product_id: 'yfts', viewValue: '泰山'},
  {product_id: 'yflp1', viewValue: '合伙'},
  {product_id: 'bgtj', viewValue: '搏股通金'},
  {product_id: 'hfyf', viewValue: '汇富'},
];

@Component({
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css'],
})
export class PositionComponent {
  displayedColumns = ['product_id', 'ticker', 'volume', 'direction', 'date'];
  dataSource: PositionDataSource;

  products = Products;
  position_type: string;

  constructor(private service: PositionService) {
    // this.refreshPosition();
  }

  public refreshPosition(product_selection: string, type_selection: string): void {
    console.log(product_selection);
    console.log(type_selection);
    this.service.getPositionInfo(product_selection, type_selection).subscribe(res => {
      this.dataSource = new PositionDataSource(res);
    });
  }

}

export class PositionDataSource extends DataSource<any> {

  constructor(private model: PositionModel[]) {
    super();
  }

  connect(): Observable<PositionModel[]> {
    return Observable.of(this.model);
  }

  disconnect() {}
}

