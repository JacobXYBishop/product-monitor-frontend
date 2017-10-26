import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatButtonModule, MatProgressSpinnerModule} from '@angular/material';

import {TreemapComponent} from './treemap/treemap.component';
import {TreemapService} from './treemap.service';
import {TreemapRoutingModule} from './treemap-routing.module';
import {OuterTreemapComponent} from './treemap/outer-treemap/outer-treemap.component';
import {InnerTreemapComponent} from './treemap/inner-treemap/inner-treemap.component';

@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    TreemapRoutingModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    TreemapComponent,
    OuterTreemapComponent,
    InnerTreemapComponent
  ],
  providers: [
    TreemapService
  ]
})
export class TreemapModule {
}
