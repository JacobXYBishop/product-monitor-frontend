import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatProgressSpinnerModule} from '@angular/material';

import {HeatmapComponent} from './heatmap/heatmap.component';
import {HeatmapService} from './heatmap.service';
import {HeatmapRoutingModule} from './heatmap-routing.module';

@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    HeatmapRoutingModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    HeatmapComponent
  ],
  providers: [
    HeatmapService
  ]
})
export class HeatmapModule {
}
