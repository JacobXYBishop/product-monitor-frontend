import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {DynamicComponent} from './dynamic/dynamic.component';
import {DynamicService} from './dynamic.service';
import {DynamicRoutingModule} from './dynamic-routing.module';



@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    DynamicRoutingModule
  ],
  declarations: [
    DynamicComponent
  ],
  providers: [
    DynamicService
  ]
})
export class DynamicModule { }
