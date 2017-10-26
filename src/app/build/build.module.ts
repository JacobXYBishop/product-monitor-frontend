import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// import {BuildService} from './build.service';
import {BuildComponent} from './build/build.component';
import {BuildRoutingModule} from './build-routing.module';

import {MatButtonModule} from '@angular/material';

@NgModule({
  imports: [
    HttpModule,
    BrowserAnimationsModule,
    BrowserModule,
    BuildRoutingModule,
    MatButtonModule
  ],
  declarations: [
    BuildComponent
  ],
  providers: [
    // BuildService
  ]
})
export class BuildModule {
}
