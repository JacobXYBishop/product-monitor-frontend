import {NgModule} from '@angular/core';

import {AdminComponent} from './admin/admin.component';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';

import {MatButtonModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonModule
  ],
  declarations: [
    AdminComponent,
  ]
})
export class AdminModule {
}
