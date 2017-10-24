import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {TreemapComponent} from './treemap/treemap.component';
import {TreemapService} from './treemap.service';
import {TreemapRoutingModule} from './treemap-routing.module';

@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    TreemapRoutingModule
  ],
  declarations: [
    TreemapComponent
  ],
  providers: [
    TreemapService
  ]
})
export class TreemapModule {
}
