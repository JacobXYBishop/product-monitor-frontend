import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountComponent} from './account/account.component';
import {AccountService} from './account.service';
import {AccountRoutingModule} from './account-routing.module';

import {MatButtonModule, MatSnackBarModule, MatTableModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatSnackBarModule
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
