import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

import {PositionService} from '../position.service';
import {PositionModel} from '../position.model';


const Products = [
  {product_id: 'gjhr1', viewValue: '慧睿1号'},
  {product_id: 'gjhr2', viewValue: '慧睿2号'},
  {product_id: 'yfwt', viewValue: '梧桐'},
  {product_id: 'yfhr', viewValue: '慧睿'},
  {product_id: 'yfhs', viewValue: '华山'},
  {product_id: 'yfts', viewValue: '泰山'},
  {product_id: 'yflp1', viewValue: '合伙'},
  {product_id: 'bgtj', viewValue: '搏股通金'},
  {product_id: 'hfyf', viewValue: '汇富'},
  {product_id: 'lhyx', viewValue: '量化优选'},
];

@Component({
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css'],
})
export class PositionComponent {
  isDataAvailable = false;
  displayedColumns = [
    'product_id',
    'ticker',
    'volume',
    'direction',
    'date'
  ];
  dataChange: BehaviorSubject<PositionModel[]> = new BehaviorSubject<PositionModel[]>([]);
  dataSource: PositionDataSource | null;
  click$ = new Subject();
  clock;

  lastUpdate;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  selectedProduct;
  products = Products;
  position_type: string;

  constructor(private service: PositionService,
              private cdRef: ChangeDetectorRef) {
    this.clock = this.click$.map(() => new Date());
  }

  get data(): PositionModel[] { return this.dataChange.value; }

  public refreshPosition(product_selection: string, type_selection: string): void {
    this.service.getPositionInfo(product_selection, type_selection).subscribe(res => {
      this.dataChange.next(res);
      this.isDataAvailable = true;
      this.cdRef.detectChanges();
      this.initSource();
      this.updateTime();
    });
  }

  initSource() {
    this.dataSource = new PositionDataSource(this, this.paginator, this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
    this.cdRef.detectChanges();
  }

  updateTime() {
    this.lastUpdate = new Date();
    console.log(this.lastUpdate);
  }

}

export class PositionDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  dataChange: BehaviorSubject<PositionModel[]> = new BehaviorSubject<PositionModel[]>([]);
  filteredData: PositionModel[] = [];
  renderedData: PositionModel[] = [];

  constructor(private component: PositionComponent,
              private _paginator: MatPaginator,
              private _sort: MatSort) {
    super();

    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  get filter(): string { return this._filterChange.value; }

  set filter(filter: string) { this._filterChange.next(filter); }

  get data(): PositionModel[] { return this.dataChange.value; }

  connect(): Observable<PositionModel[]> {
    const displayDataChanges = [
      this.component.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      this.filteredData = this.component.data.slice().filter((item: PositionModel) => {
        const searchStr = (item.ticker).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      const sortedData = this.sortData(this.filteredData.slice());

      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    });
  }

  disconnect() {}

  sortData(data: PositionModel[]): PositionModel[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'product_id':
          [propertyA, propertyB] = [a.product_id, b.product_id];
          break;
        case 'ticker':
          [propertyA, propertyB] = [a.ticker, b.ticker];
          break;
        case 'volume':
          [propertyA, propertyB] = [a.volume, b.volume];
          break;
        case 'direction':
          [propertyA, propertyB] = [a.direction, b.direction];
          break;
        case 'date':
          [propertyA, propertyB] = [a.date, b.date];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}

