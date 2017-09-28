import {Component} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {PositionService} from '../position.service';
import {PositionModel} from '../position.model';


@Component({
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css'],
})
export class PositionComponent {
  displayedColumns = ['product_id', 'ticker', 'volume', 'direction', 'date'];
  dataSource: PositionDataSource;

  constructor(private service: PositionService) {
    this.refreshPosition();
  }

  public refreshPosition(): void {
    this.service.getPositionInfo().subscribe(res => {
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

