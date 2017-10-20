import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

import {AccountService} from '../account.service';
import {AccountModel} from '../account.model';

import {invokeSleep} from '../../utils';

@Component({
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  isDataAvailable = false;
  displayedColumns = [
    'product_name',
    'stock_mv',
    'future_mv',
    'future_mg',
    'stock_total_asset',
    'future_total_asset',
    'account_total_asset',
    'account_position_pct',
    'future_risk_pct',
    'exposure',
    'exposure_pct'
  ];
  dataChange: BehaviorSubject<AccountModel[]> = new BehaviorSubject<AccountModel[]>([]);
  dataSource: AccountDataSource | null;
  click$ = new Subject();
  clock;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private service: AccountService,
              private cdRef: ChangeDetectorRef,
              private snackBar: MatSnackBar) {
    this.clock = Observable.merge(
      this.click$,
      Observable.interval(60000)
    ).map(() => {
      console.log('refreshed');
      if (invokeSleep() === true) {
        this.refreshAllAccounts();
      }
      return new Date();
    });
  }

  get data(): AccountModel[] { return this.dataChange.value; }

  public refreshAllAccounts(): void {
    this.service.getAccountInfo().subscribe(res => {
      this.dataChange.next(res);
      this.isDataAvailable = true;
      this.cdRef.detectChanges();
      this.initSource();
      this.openSnackBar();
    });
  }

  ngOnInit() {
    this.refreshAllAccounts();
  }

  public openSnackBar() {
    this.snackBar.open('更新中...', '', {duration: 2000});
  }

  public switchColor(num, threshold) {
    if (num >= threshold) {
      return 'red';
    } else {
      return 'dimgray';
    }
  }

  initSource() {
    this.dataSource = new AccountDataSource(this, this.paginator, this.sort);
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

}


// export class AccountDataBase {
//   public dataChange: BehaviorSubject<AccountModel[]> = new BehaviorSubject<AccountModel[]>([]);
//
//   constructor(private service: AccountService) {
//     this.service.getAccountInfo().subscribe(candlestickData => this.dataChange.next(candlestickData));
//   }
//
//   get candlestickData(): AccountModel[] { return this.dataChange.value; }
// }


export class AccountDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  dataChange: BehaviorSubject<AccountModel[]> = new BehaviorSubject<AccountModel[]>([]);
  filteredData: AccountModel[] = [];
  renderedData: AccountModel[] = [];

  constructor(private component: AccountComponent,
              private _paginator: MatPaginator,
              private _sort: MatSort) {
    super();

    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  get filter(): string { return this._filterChange.value; }

  set filter(filter: string) { this._filterChange.next(filter); }

  get data(): AccountModel[] { return this.dataChange.value; }

  connect(): Observable<AccountModel[]> {
    const displayDataChanges = [
      this.component.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter candlestickData
      this.filteredData = this.component.data.slice().filter((item: AccountModel) => {
        const searchStr = (item.product_name).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered candlestickData
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted candlestickData.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    });
  }

  disconnect() {}

  sortData(data: AccountModel[]): AccountModel[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'product_name':
          [propertyA, propertyB] = [a.product_name, b.product_name];
          break;
        case 'stock_mv':
          [propertyA, propertyB] = [a.stock_mv, b.stock_mv];
          break;
        case 'future_mv':
          [propertyA, propertyB] = [a.future_mv, b.future_mv];
          break;
        case 'future_mg':
          [propertyA, propertyB] = [a.future_mg, b.future_mg];
          break;
        case 'stock_total_asset':
          [propertyA, propertyB] = [a.stock_total_asset, b.stock_total_asset];
          break;
        case 'future_total_asset':
          [propertyA, propertyB] = [a.future_total_asset, b.future_total_asset];
          break;
        case 'account_total_asset':
          [propertyA, propertyB] = [a.account_total_asset, b.account_total_asset];
          break;
        case 'account_position_pct':
          [propertyA, propertyB] = [a.account_position_pct, b.account_position_pct];
          break;
        case 'future_risk_pct':
          [propertyA, propertyB] = [a.future_risk_pct, b.future_risk_pct];
          break;
        case 'exposure':
          [propertyA, propertyB] = [a.exposure, b.exposure];
          break;
        case 'exposure_pct':
          [propertyA, propertyB] = [a.exposure_pct, b.exposure_pct];
          break;
        // case 'future_mv':
        //   [propertyA, propertyB] = [a.future_mv, b.future_mv];
        //   break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
