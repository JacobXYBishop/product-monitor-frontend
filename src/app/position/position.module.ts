import {NgModule} from '@angular/core';

import {PositionComponent} from './position/position.component';
import {PositionService} from './position.service';
import {PositionRoutingModule} from './position-routing.module';

import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CdkTableModule} from '@angular/cdk/table';
import {HttpModule} from '@angular/http';
import {
  MatButtonModule,
  MatGridListModule,
  MatInputModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';


@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    PositionRoutingModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatTableModule,
    MatGridListModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    CdkTableModule
  ],
  declarations: [
    PositionComponent
  ],
  providers: [
    PositionService
  ]
})
export class PositionModule {
}
