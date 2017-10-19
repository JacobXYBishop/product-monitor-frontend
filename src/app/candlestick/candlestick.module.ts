import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {CandlestickService} from './candlestick.service';
import {CandlestickComponent} from './candlestick/candlestick.component';
import {CandlestickRoutingModule} from './candlestick-routing.module';


@NgModule({
  imports: [
    HttpModule,
    BrowserAnimationsModule,
    BrowserModule,
    CandlestickRoutingModule
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
