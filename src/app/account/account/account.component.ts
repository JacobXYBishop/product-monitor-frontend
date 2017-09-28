import {Component} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {AccountService} from '../account.service';
import {AccountModel} from '../account.model';

import {MdSnackBar} from '@angular/material';


@Component({
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  displayedColumns = [
    'product_name',
    'stock_mv',
    'future_mv',
    'future_mg',
    'stock_total_asset',
    'future_total_asset',
    'account_total_asset',
    'exposure',
    'exposure_pct'
  ];
  dataSource: AccountDataSource;

  constructor(private service: AccountService,
              private snackBar: MdSnackBar) {
    this.refreshAllAccounts();
  }


  public refreshAllAccounts(): void {
    this.service.getAccountInfo().subscribe(res => {
      this.dataSource = new AccountDataSource(res);
    });
  }

  public openSnackBar() {
    this.snackBar.open('刷新中...', '', {duration: 3000});
  }

}

export class AccountDataSource extends DataSource<any> {

  constructor(private model: AccountModel[]) {
    super();
  }

  connect(): Observable<AccountModel[]> {
    return Observable.of(this.model);
  }

  disconnect() {}
}
