import {NgModule} from '@angular/core';

import {AdminComponent} from './admin/admin.component';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {BuildComponent} from '../build/build/build.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    BuildComponent,
  ]
})
export class AdminModule {
}
