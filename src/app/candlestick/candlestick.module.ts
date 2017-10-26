import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {CandlestickComponent} from './candlestick/candlestick.component';
import {CandlestickService} from './candlestick.service';
import {CandlestickRoutingModule} from './candlestick-routing.module';

import {MatProgressSpinnerModule} from '@angular/material';


@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    CandlestickRoutingModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    CandlestickComponent
  ],
  providers: [
    CandlestickService
  ]
})
export class CandlestickModule {
}
