import {NgModule} from '@angular/core';

import {SummaryComponent} from './summary/summary.component';
import {SummaryService} from './summary.service';
import {SummaryRoutingModule} from './summary-routing.module';

import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

import {
  MatButtonModule,
  MatDatepickerModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSelectModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    SummaryRoutingModule,

    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatListModule,
    FlexLayoutModule
  ],
  declarations: [
    SummaryComponent
  ],
  providers: [
    SummaryService
  ]
})
export class SummaryModule {
}
