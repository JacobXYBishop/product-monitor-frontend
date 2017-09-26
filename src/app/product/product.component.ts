import {Component, OnInit} from '@angular/core';
import {AccountService} from '../account-info.service';
import {AccountSchemaModel} from '../account-schema.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  observableAccountList$: Observable<AccountSchemaModel[]>;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.refreshAllAccounts();
  }

  refreshAllAccounts(): void {
    this.observableAccountList$ = this.accountService.getAccountInfo();
  }

}
