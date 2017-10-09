import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {PositionComponent} from './position/position.component';
import {PositionService} from './position.service';
import {PositionRoutingModule} from './position-routing.module';

import {MatButtonModule, MatRadioModule, MatSelectModule, MatTableModule} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    PositionRoutingModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatTableModule
  ],
  declarations: [
    PositionComponent
  ],
  providers: [
    PositionService
  ]
})
export class PositionModule {
}
