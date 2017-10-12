import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

import {BuildService} from '../build.service';

@Component({
  templateUrl: './build.component.html',
})
export class BuildComponent implements OnInit {
  isDataAvailable = false;
  displayedColumns = [
    'changeId',
    'changeTitle',
    'dateSubmitted',
    'changeSponsor',
    'changeDescription'
  ];

  dataChange: BehaviorSubject<ChangeData[]> = new BehaviorSubject<ChangeData[]>([]);
  dataSource: BuildDataSource | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private service: BuildService,
              private cdRef: ChangeDetectorRef) {
  }

  get data(): ChangeData[] { return this.dataChange.value; }

  populateBuildQueue() {
    this.service.populateBuildQueue().subscribe(res => {
      this.dataChange.next(res);
      this.isDataAvailable = true;
      this.cdRef.detectChanges();
      this.initSource();
    });
  }

  ngOnInit() {
    this.populateBuildQueue();
  }

  initSource() {
    this.dataSource = new BuildDataSource(this, this.paginator, this.sort);
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

export interface ChangeData {
  ChangeId: string;
  ChangeTitle: string;
  DateSubmitted: string;
  ChangeSponsor: string;
  ChangeDescription: string;
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class BuildDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  dataChange: BehaviorSubject<ChangeData[]> = new BehaviorSubject<ChangeData[]>([]);
  filteredData: ChangeData[] = [];
  renderedData: ChangeData[] = [];

  constructor(private component: BuildComponent,
              private _paginator: MatPaginator,
              private _sort: MatSort) {
    super();

    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  get filter(): string { return this._filterChange.value; }

  set filter(filter: string) { this._filterChange.next(filter); }

  get data(): ChangeData[] { return this.dataChange.value; }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ChangeData[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.component.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this.component.data.slice().filter((item: ChangeData) => {
        const searchStr = (item.ChangeDescription + item.ChangeSponsor).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    });
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  sortData(data: ChangeData[]): ChangeData[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'changeId':
          [propertyA, propertyB] = [a.ChangeId, b.ChangeId];
          break;
        case 'changeTitle':
          [propertyA, propertyB] = [a.ChangeTitle, b.ChangeTitle];
          break;
        case 'dateSubmitted':
          [propertyA, propertyB] = [a.DateSubmitted, b.DateSubmitted];
          break;
        case 'changeSponsor':
          [propertyA, propertyB] = [a.ChangeSponsor, b.ChangeSponsor];
          break;
        case 'changeDescription':
          [propertyA, propertyB] = [a.ChangeDescription, b.ChangeDescription];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
