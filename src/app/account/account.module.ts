import {NgModule} from '@angular/core';
import {AccountComponent} from './account/account.component';
import {AccountService} from './account.service';
import {AccountRoutingModule} from './account-routing.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {CdkTableModule} from '@angular/cdk/table';
import {HttpModule} from '@angular/http';
import {MatInputModule, MatPaginatorModule, MatButtonModule, MatSnackBarModule, MatTableModule, MatSortModule} from '@angular/material';

@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    AccountRoutingModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    CdkTableModule,
    MatPaginatorModule
  ],
  declarations: [
    AccountComponent
  ],
  providers: [
    AccountService
  ]
})
export class AccountModule {
}
