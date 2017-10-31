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
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSelectModule
} from '@angular/material';


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
    MatGridListModule,
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
