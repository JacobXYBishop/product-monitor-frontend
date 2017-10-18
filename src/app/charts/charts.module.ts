import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ChartsService} from './charts.service';
import {ChartsComponent} from './charts/charts.component';
import {ChartsRoutingModule} from './charts-routing.module';


@NgModule({
  imports: [
    HttpModule,
    BrowserAnimationsModule,
    BrowserModule,
    ChartsRoutingModule
  ],
  declarations: [
    ChartsComponent
  ],
  providers: [
    ChartsService
  ]
})
export class ChartsModule {
}
